import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Project, ProjectCategory} from '../../../app/core/projects/project';

@Component({
  templateUrl: 'project-edit-view.component.html',
  styleUrls: ['project-edit-view.component.css']
})
export class ProjectEditViewComponent {
  project: Project;
  projectCategories = [
    ProjectCategory.Indicator, ProjectCategory.Sensor, ProjectCategory.Actuator, ProjectCategory.Custom
  ];

  projectEditor: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.project = new Project();

    this.projectEditor = this.formBuilder.group({
      name: [this.project.name, Validators.required],
      category: [this.project.category, Validators.required]
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
}
