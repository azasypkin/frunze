import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import {Project, ProjectKind} from '../../../app/core/projects/project';


@Component({
  templateUrl: 'project-edit-view.component.html',
  styleUrls: ['project-edit-view.component.css']
})
export class ProjectEditViewComponent implements OnInit {
  project: Project;
  projectKinds = [
    ProjectKind.Indicator, ProjectKind.Sensor, ProjectKind.Actuator, ProjectKind.Custom
  ];

  projectEditor: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.projectEditor = this.formBuilder.group({
      name: ['', Validators.required],
      kind: [ProjectKind.Custom, Validators.required]
    });
  }

  /**
   * Converts kind code to localized kind label.
   * TODO: Add localization support and get rid of hardcoded strings.
   * @param {ProjectKind} kind Project kind to get a label for.
   * @returns {string} Human readable kind label.
   */
  getKindLabel(kind: ProjectKind) {
    switch (kind) {
      case ProjectKind.Indicator:
        return 'Indicator';
      case ProjectKind.Sensor:
        return 'Sensor';
      case ProjectKind.Actuator:
        return 'Actuator';
      case ProjectKind.Custom:
        return 'Custom';
      default:
        throw new Error(`Unsupported project kind code "${kind}"`);
    }
  }

  updateProject(project: Project) {
    this.project = project;

    this.projectEditor.setValue({
      name: this.project.name,
      kind: this.project.kind
    });
  }

  ngOnInit() {
    // TODO: Temporal solution, later on we should implement project service to load project by id if it's provided.
    this.route.params
      .switchMap((params: Params) => Observable.of(new Project(params['id'] || 'New Project')))
      .subscribe((project: Project) => this.updateProject(project));
  }
}
