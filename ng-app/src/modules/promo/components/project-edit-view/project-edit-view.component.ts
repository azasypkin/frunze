import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import {ProjectService} from '../../../app/services/project.service';

import {Project} from '../../../app/core/projects/project';
import {ProjectCapabilityGroup} from '../../../app/core/projects/project-capability-group';

@Component({
  templateUrl: 'project-edit-view.component.html',
  styleUrls: ['project-edit-view.component.css']
})
export class ProjectEditViewComponent implements OnInit {
  project: Project;
  projectCapabilityGroups: ProjectCapabilityGroup[];

  projectEditor: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private projectService: ProjectService) {
    this.projectEditor = this.formBuilder.group({
      name: ['', Validators.required],
      kind: ['', Validators.required]
    });
  }

  updateProject(project: Project) {
    this.project = project;

    this.projectEditor.setValue({
      name: this.project.name,
      kind: ''
    });
  }

  ngOnInit() {
    // TODO: Temporal solution, later on we should implement project service to load project by id if it's provided.
    this.route.params
      .switchMap((params: Params) => Observable.of(new Project(params['id'] || 'New Project', [])))
      .subscribe((project: Project) => this.updateProject(project));

    this.projectService.getCapabilities().subscribe(
      (groups: ProjectCapabilityGroup[]) => this.projectCapabilityGroups = groups
    );
  }
}
