import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import {Project, ProjectCategory} from '../../../app/core/projects/project';


@Component({
  templateUrl: 'project-edit-view.component.html',
  styleUrls: ['project-edit-view.component.css']
})
export class ProjectEditViewComponent implements OnInit {
  project: Project;
  projectCategories = [
    ProjectCategory.Indicator, ProjectCategory.Sensor, ProjectCategory.Actuator, ProjectCategory.Custom
  ];

  projectEditor: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.projectEditor = this.formBuilder.group({
      name: ['', Validators.required],
      category: [ProjectCategory.Custom, Validators.required]
    });
  }

  /**
   * Converts category code to localized category label.
   * TODO: Add localization support and get rid of hardcoded strings.
   * @param {ProjectCategory} category Category to get a label for.
   * @returns {string} Human readable category label.
   */
  getCategoryLabel(category: ProjectCategory) {
    switch (category) {
      case ProjectCategory.Indicator:
        return 'Indicator';
      case ProjectCategory.Sensor:
        return 'Sensor';
      case ProjectCategory.Actuator:
        return 'Actuator';
      case ProjectCategory.Custom:
        return 'Custom';
      default:
        throw new Error(`Unsupported project category code "${category}"`);
    }
  }

  updateProject(project: Project) {
    this.project = project;

    this.projectEditor.setValue({
      name: this.project.name,
      category: this.project.category
    });
  }

  ngOnInit() {
    // TODO: Temporal solution, later on we should implement project service to load project by id if it's provided.
    this.route.params
      .switchMap((params: Params) => Observable.of(new Project(params['id'] || 'New Project')))
      .subscribe((project: Project) => this.updateProject(project));
  }
}
