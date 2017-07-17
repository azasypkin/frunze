import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms'

import {Project} from '../../../core/projects/project';
import {ProjectComponent} from '../../../core/projects/project-component';
import {ProjectComponentTriggerAction} from '../../../core/projects/project-component-trigger-action';
import {ComponentSchema} from '../../../core/components/component-schema';

import {ComponentsService} from '../../../services/components.service';

import {MODAL_DIALOG_PARAMETERS} from '../../modal-dialog/modal-dialog.component';

export interface IDialogInputs {
  project: Project;
  component: ProjectComponent;
  type: string;
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
  triggerActions: ProjectComponentTriggerAction[];

  constructor(@Inject(MODAL_DIALOG_PARAMETERS) readonly inputs: IDialogInputs,
              private componentsService: ComponentsService) {
    this.componentEditor.setValue('');
    this.actionEditor.setValue('');

    let actions = this.inputs.component.triggers.get(this.inputs.type);
    if (!actions) {
      actions = [];
      this.inputs.component.triggers.set(this.inputs.type, actions);
    }

    this.triggerActions = actions;

    this.actionEditor.valueChanges.subscribe(() => {
      if (!this.actionEditor.value) {
        return;
      }

      this.triggerActions.push(
        new ProjectComponentTriggerAction(this.componentEditor.value, this.actionEditor.value)
      );

      this.componentEditor.setValue('');
      this.actionEditor.setValue('');
    });
  }

  ngOnInit() {
    this.componentsService.getSchemas().subscribe((schemas) => this.schemas = schemas);
  }

  getComponentName(component: ProjectComponent) {
    return component.properties.get('name') ||
      this.schemas.get(component.type).name;
  }

  getTriggerComponentName(triggerAction: ProjectComponentTriggerAction) {
    return this.getComponentName(this.findComponentById(triggerAction.component));
  }

  getTriggerActionName(triggerAction: ProjectComponentTriggerAction) {
    const component = this.findComponentById(triggerAction.component);
    return this.schemas.get(component.type).actions.get(triggerAction.action).name;
  }

  getActions() {
    const component = this.findComponentById(this.componentEditor.value);
    if (!component) {
      return [];
    }

    return Array.from(this.schemas.get(component.type).actions.values());
  }

  removeAction(index: number) {
    this.triggerActions.splice(index, 1);
  }

  private findComponentById(componentId: string) {
    return this.inputs.project.components.find(
      (component) => component.id === componentId
    );
  }
}
