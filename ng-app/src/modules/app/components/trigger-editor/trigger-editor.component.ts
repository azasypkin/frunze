import {Component, Input} from '@angular/core';

import {ModalDialogService} from '../../services/modal-dialog.service';

import {ComponentTriggerSchema} from '../../core/components/component-trigger-schema';
import {Project} from '../../core/projects/project';
import {ProjectComponent} from '../../core/projects/project-component';
import {TriggersEditorDialogComponent} from '../dialogs/triggers-editor-dialog/triggers-editor-dialog.component';

@Component({
  selector: 'frunze-trigger-editor',
  templateUrl: 'trigger-editor.component.html',
  styleUrls: ['trigger-editor.component.css']
})
export class TriggerEditorComponent {
  @Input() project: Project;
  @Input() component: ProjectComponent;
  @Input() schema: ComponentTriggerSchema;

  constructor(private dialogService: ModalDialogService) {
  }

  launchActionsEditor() {
    this.dialogService.show(TriggersEditorDialogComponent, 'Test content');
  }
}
