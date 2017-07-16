import {Component, Input} from '@angular/core';

import {ModalDialogService} from '../../services/modal-dialog.service';

import {ComponentTriggerSchema} from '../../core/components/component-trigger-schema';
import {Project} from '../../core/projects/project';
import {ProjectComponent} from '../../core/projects/project-component';
import {ProjectComponentTriggerAction} from '../../core/projects/project-component-trigger-action';
import {
  TriggersEditorDialogComponent, IDialogInputs
} from '../dialogs/triggers-editor-dialog/triggers-editor-dialog.component';

@Component({
  selector: 'frunze-trigger-editor',
  templateUrl: 'trigger-editor.component.html',
  styleUrls: ['trigger-editor.component.css']
})
export class TriggerEditorComponent {
  // TODO: TOOOOOOOO MUCH INPUT PARAMETERS!!!!!
  @Input() project: Project;
  @Input() component: ProjectComponent;
  @Input() schema: ComponentTriggerSchema;
  @Input() key: string;

  constructor(private dialogService: ModalDialogService) {
  }

  launchActionsEditor() {
    this.dialogService.show(TriggersEditorDialogComponent, <IDialogInputs>{
      title: `Edit "${this.schema.name}" trigger actions`,
      project: this.project,
      addAction: (action: ProjectComponentTriggerAction) => {
        let actions = this.component.triggers.get(this.key);
        if (!actions) {
          actions = [];
          this.component.triggers.set(this.key, actions);
        }

        actions.push(action);

        console.log(`New action has been added ${action.action}!`);
      }
    });
  }
}
