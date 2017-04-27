import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import {ProjectService} from '../../../app/services/project.service';

import {Project} from '../../../app/core/projects/project';
import {ProjectCapabilityGroup} from '../../../app/core/projects/project-capability-group';
import {ProjectPlatform} from '../../../app/core/projects/project-platform';

const DEFAULT_PLATFORM = new ProjectPlatform('attiny', 'Atmel ATtiny85',
    'High Performance, Low Power AVR® 8-Bit Microcontroller', []);

@Component({
  templateUrl: 'project-edit-view.component.html',
  styleUrls: ['project-edit-view.component.css']
})
export class ProjectEditViewComponent implements OnInit {
  project: Project;
  availableCapabilityGroups: ProjectCapabilityGroup[];

  projectEditor: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private projectService: ProjectService) {
    this.projectEditor = this.formBuilder.group({
      name: ['', Validators.required],
      capabilities: this.formBuilder.array([])
    });
  }

  updateProject(project: Project) {
    this.project = project;

    this.projectEditor.patchValue({ name: this.project.name });
  }

  updateCapabilityGroups(capabilities: ProjectCapabilityGroup[]) {
    this.availableCapabilityGroups = capabilities;

    const capabilityGroups = capabilities.map(
      (group) => this.formBuilder.array(group.capabilities.map((capability) => this.formBuilder.control(false)))
    );

    this.projectEditor.setControl('capabilities', this.formBuilder.array(capabilityGroups));
  }

  ngOnInit() {
    this.projectService.getCapabilities().subscribe(
      (groups: ProjectCapabilityGroup[]) => this.updateCapabilityGroups(groups)
    );

    // TODO: Temporal solution, later on we should implement project service to load project by id if it's provided.
    this.route.params
      .switchMap((params: Params) => Observable.of(new Project(params['id'] || 'New Project', [], DEFAULT_PLATFORM)))
      .subscribe((project: Project) => this.updateProject(project));
  }

  onNext() {
    const capabilities = [];
    const capabilitiesEditor = this.projectEditor.get('capabilities') as FormArray;

    this.availableCapabilityGroups.forEach((group, groupIndex) => {
      group.capabilities.forEach((capability, capabilityIndex) => {
        const capabilityEditor = capabilitiesEditor.at(groupIndex) as FormArray;
        if (capabilityEditor.at(capabilityIndex).value) {
          capabilities.push(capability);
        }
      });
    });

    // Update project.
    this.project = new Project(
        this.projectEditor.get('name').value.toString(),
        capabilities,
        DEFAULT_PLATFORM
    );
  }
}
