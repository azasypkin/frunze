import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms'

import {Project} from '../../../core/projects/project';
import {ProjectComponent} from '../../../core/projects/project-component';
import {ProjectComponentTriggerAction} from '../../../core/projects/project-component-trigger-action';
import {ComponentSchema} from '../../../core/components/component-schema';

import {ComponentsService} from '../../../services/components.service';

import {MODAL_DIALOG_PARAMETERS} from '../../modal-dialog/modal-dialog.component';

export interface IDialogInputs {
  title: string;
  project: Project;
  addAction: (action: ProjectComponentTriggerAction) => void;
}

@Component({
  selector: 'frunze-triggers-editor-dialog',
  templateUrl: 'triggers-editor-dialog.component.html',
  styleUrls: ['triggers-editor-dialog.component.css']
})
export class TriggersEditorDialogComponent implements OnInit {
  schemas: Map<string, ComponentSchema>;

  componentEditor = new FormControl();
  actionEditor = new FormControl();

  constructor(@Inject(MODAL_DIALOG_PARAMETERS) readonly inputs: IDialogInputs,
              private componentsService: ComponentsService) {
    this.componentEditor.setValue('');
    this.actionEditor.setValue('');
  }

  ngOnInit() {
    this.componentsService.getSchemas().subscribe((schemas) => this.schemas = schemas);
  }

  addAction() {
    this.inputs.addAction(
      new ProjectComponentTriggerAction(this.componentEditor.value, this.actionEditor.value)
    );
  }

  getComponentName(component: ProjectComponent) {
    return component.properties.get('name') ||
      this.schemas.get(component.type).name;
  }

  getActions() {
    const component = this.inputs.project.components.find(
      (c) => c.id === this.componentEditor.value
    );

    if (!component) {
      return [];
    }

    return Array.from(this.schemas.get(component.type).actions.values());
  }
}
