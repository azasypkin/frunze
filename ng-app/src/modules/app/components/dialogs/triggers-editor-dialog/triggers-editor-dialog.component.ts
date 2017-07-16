import {Component, Inject} from '@angular/core';

import {Project} from '../../../core/projects/project';
import {ProjectComponentTriggerAction} from '../../../core/projects/project-component-trigger-action';
import {ComponentSchema} from '../../../core/components/component-schema';
import {MODAL_DIALOG_PARAMETERS} from '../../modal-dialog/modal-dialog.component';

export interface IDialogInputs {
  title: string;
  project: Project;
  componentSchemas: Map<string, ComponentSchema>;
  addAction: (action: ProjectComponentTriggerAction) => void;
}

@Component({
  selector: 'frunze-triggers-editor-dialog',
  templateUrl: 'triggers-editor-dialog.component.html',
  styleUrls: ['triggers-editor-dialog.component.css']
})
export class TriggersEditorDialogComponent {
  constructor(@Inject(MODAL_DIALOG_PARAMETERS) readonly inputs: IDialogInputs) {
  }

  addAction() {
    this.inputs.addAction(
      new ProjectComponentTriggerAction('a', `action for ${this.inputs.project.name}`)
    );
  }
}
