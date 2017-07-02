import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import {ProjectService} from '../../../app/services/project.service';

import {Project} from '../../../app/core/projects/project';
import {ProjectCapability} from '../../../app/core/projects/project-capability';
import {ProjectCapabilityGroup} from '../../../app/core/projects/project-capability-group';
import {ProjectPlatform} from '../../../app/core/projects/project-platform';

@Component({
  templateUrl: 'project-metadata-view.component.html',
  styleUrls: ['project-metadata-view.component.css']
})
export class ProjectMetadataViewComponent implements OnInit {
  project: Project;
  capabilities: ProjectCapability[];
  capabilityGroups: ProjectCapabilityGroup[];
  platforms: ProjectPlatform[];
  notSupportedPlatforms: Set<string>;

  projectEditor: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
              private projectService: ProjectService) {
    this.projectEditor = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      capabilities: this.formBuilder.array([]),
      platform: ['', Validators.required]
    });
  }

  updateProject(project: Project) {
    this.project = project;

    // FIXME: Use reverse capability-group index to quickly check needed capabilities.
    this.project.capabilities.forEach((projectCapability) => {
      for (let groupIndex = 0; groupIndex < this.capabilityGroups.length; groupIndex++) {
        const capabilityIndex = this.capabilityGroups[groupIndex].capabilities.findIndex(
            (capability) => capability.type === projectCapability.type
        );

        if (capabilityIndex >= 0) {
          this.getCapabilityEditor(groupIndex, capabilityIndex).setValue(true);
          break;
        }
      }
    });

    this.projectEditor.patchValue({
      name: this.project.name,
      description: this.project.description,
      platform: this.project.platform ? this.project.platform.type : ''
    });
  }

  updateCapabilityGroups(capabilityGroups: ProjectCapabilityGroup[]) {
    this.capabilityGroups = capabilityGroups;

    const capabilityGroupsControl = this.formBuilder.array(
      capabilityGroups.map(
        (group) => this.formBuilder.array(
            group.capabilities.map((capability) => this.formBuilder.control(false))
        )
      )
    );

    capabilityGroupsControl.valueChanges.forEach(() => this.onCapabilityChanged());

    this.projectEditor.setControl('capabilities', capabilityGroupsControl);
  }

  updatePlatforms(platforms: ProjectPlatform[]) {
    this.platforms = platforms;
    this.notSupportedPlatforms = new Set();
  }

  ngOnInit() {
    this.projectService.getCapabilities().subscribe((capabilities) => this.capabilities = capabilities);
    this.projectService.getCapabilityGroups().subscribe((groups) => this.updateCapabilityGroups(groups));
    this.projectService.getPlatforms().subscribe((platforms) => this.updatePlatforms(platforms));

    this.route.params
      .switchMap((params: Params) => {
        if (params['id']) {
          return this.projectService.getProject(params['id']);
        }

        return Observable.of(new Project('', 'New Project', 'New Project Description', [], null, []));
      })
      .subscribe((project: Project) => this.updateProject(project));
  }

  onNext() {
    const capabilities = [];
    const capabilitiesEditor = this.projectEditor.get('capabilities') as FormArray;

    this.capabilityGroups.forEach((group, groupIndex) => {
      group.capabilities.forEach((capability, capabilityIndex) => {
        const capabilityEditor = capabilitiesEditor.at(groupIndex) as FormArray;
        if (capabilityEditor.at(capabilityIndex).value) {
          capabilities.push(capability);
        }
      });
    });

    const platformType = this.projectEditor.get('platform').value.toString();

    // Update project.
    this.project = new Project(
        this.project.id,
        this.projectEditor.get('name').value.toString(),
        this.projectEditor.get('description').value.toString(),
        capabilities,
        platformType ? this.platforms.find((platform) => platform.type === platformType) : null,
        this.project.components
    );

    // Now we should save the project and edit its software part.
    this.projectService.saveProject(this.project).subscribe((project) => {
      this.router.navigate([`promo/project/software/${project.id}`]);
    });
  }

  onGoToProjects() {
    this.router.navigate(['promo/projects']);
  }

  onCapabilityChanged() {
    this.updateNotSupportedPlatforms();

    const platformEditor = this.projectEditor.get('platform');
    if (this.notSupportedPlatforms.has(platformEditor.value.toString())) {
      platformEditor.setValue('');
    }
  }

  updateNotSupportedPlatforms() {
    // TODO: Very ineffective way of handling the use case, migrate to Map's.
    this.notSupportedPlatforms = new Set();
    const capabilitiesEditor = this.projectEditor.get('capabilities') as FormArray;

    for (let groupIndex = 0; groupIndex < this.capabilityGroups.length; groupIndex++) {
      const group = this.capabilityGroups[groupIndex];
      for (let capabilityIndex = 0; capabilityIndex < group.capabilities.length; capabilityIndex++) {
        const capabilityEditor = capabilitiesEditor.at(groupIndex) as FormArray;
        if (!capabilityEditor.at(capabilityIndex).value) {
          continue;
        }

        const capability = group.capabilities[capabilityIndex];

        for (const platform of this.platforms) {
          // If this platform is already not supported, just skip.
          if (this.notSupportedPlatforms.has(platform.type)) {
            continue;
          }

          // If Platform doesn't have selected capability, we can't choose it.
          if (platform.capabilities.findIndex((c) => c.type === capability.type) < 0) {
            this.notSupportedPlatforms.add(platform.type);

            // Check if we already marked all platforms as not supported.
            if (this.notSupportedPlatforms.size === this.platforms.length) {
              return;
            }
          }
        }
      }
    }
  }

  isCapabilitySelected(groupIndex, capabilityIndex) {
    return this.getCapabilityEditor(groupIndex, capabilityIndex).value;
  }

  isPlatformSelected(platformType) {
    return this.projectEditor.get('platform').value === platformType;
  }

  getCapabilityEditor(groupIndex, capabilityIndex) {
    const capabilityEditor = (this.projectEditor.get('capabilities') as FormArray).at(groupIndex);
    return (capabilityEditor as FormArray).at(capabilityIndex);
  }
}
