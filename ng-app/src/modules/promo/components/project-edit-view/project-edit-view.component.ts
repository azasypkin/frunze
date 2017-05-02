import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import {ProjectService} from '../../../app/services/project.service';

import {Project} from '../../../app/core/projects/project';
import {ProjectCapability} from '../../../app/core/projects/project-capability';
import {ProjectCapabilityGroup} from '../../../app/core/projects/project-capability-group';
import {ProjectPlatform} from '../../../app/core/projects/project-platform';

@Component({
  templateUrl: 'project-edit-view.component.html',
  styleUrls: ['project-edit-view.component.css']
})
export class ProjectEditViewComponent implements OnInit {
  project: Project;
  capabilities: ProjectCapability[];
  capabilityGroups: ProjectCapabilityGroup[];
  platforms: ProjectPlatform[];
  notSupportedPlatforms: Set<string>;

  projectEditor: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private projectService: ProjectService) {
    this.projectEditor = this.formBuilder.group({
      name: ['', Validators.required],
      capabilities: this.formBuilder.array([]),
      platform: ['', Validators.required]
    });
  }

  updateProject(project: Project) {
    this.project = project;

    this.projectEditor.patchValue({
      name: this.project.name,
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

    // TODO: Temporal solution, later on we should implement project service to load project by id if it's provided.
    this.route.params
      .switchMap((params: Params) => Observable.of(new Project(params['id'] || 'New Project', [])))
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
        this.projectEditor.get('name').value.toString(),
        capabilities,
        platformType ? this.platforms.find((platform) => platform.type === platformType) : null
    );
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
    const capabilityEditor = (this.projectEditor.get('capabilities') as FormArray).at(groupIndex);
    return (capabilityEditor as FormArray).at(capabilityIndex).value;
  }

  isPlatformSelected(platformType) {
    return this.projectEditor.get('platform').value === platformType;
  }
}
