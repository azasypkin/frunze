import { Component, Input, OnInit } from '@angular/core';

import { ComponentsService } from '../../services/components.service';
import { ModalDialogService } from '../../services/modal-dialog.service';

import { ComponentTriggerSchema } from '../../core/components/component-trigger-schema';
import { Project } from '../../core/projects/project';
import { ProjectComponent } from '../../core/projects/project-component';
import {
  TriggersEditorDialogComponent,
  IDialogInputs,
} from '../dialogs/triggers-editor-dialog/triggers-editor-dialog.component';

@Component({
  selector: 'frunze-trigger-editor',
  templateUrl: 'trigger-editor.component.html',
  styleUrls: ['trigger-editor.component.css'],
})
export class TriggerEditorComponent implements OnInit {
  @Input() project: Project;
  @Input() component: ProjectComponent;

  @Input() type: string;
  schema: ComponentTriggerSchema;

  constructor(
    private componentsService: ComponentsService,
    private dialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.componentsService.getSchemas().subscribe((schemas) => {
      this.schema = schemas.get(this.component.type).triggers.get(this.type);
    });
  }

  launchActionsEditor() {
    this.dialogService.show(
      TriggersEditorDialogComponent,
      `Actions to perform on "${this.schema.name}"`,
      <IDialogInputs>{
        project: this.project,
        component: this.component,
        type: this.type,
      }
    );
  }
}
