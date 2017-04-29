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

    const capabilityGroupsControl = capabilityGroups.map(
      (group) => this.formBuilder.array(group.capabilities.map((capability) => this.formBuilder.control(false)))
    );

    this.projectEditor.setControl('capabilities', this.formBuilder.array(capabilityGroupsControl));
  }

  updatePlatforms(platforms: ProjectPlatform[]) {
    this.platforms = platforms;
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
}
