import {Component, Input, OnInit} from '@angular/core';

import {ComponentsService} from '../../services/components.service';
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
export class TriggerEditorComponent implements OnInit {
  @Input() project: Project;
  @Input() component: ProjectComponent;

  @Input() type: string;
  schema: ComponentTriggerSchema;

  constructor(private componentsService: ComponentsService,
              private dialogService: ModalDialogService) {
  }

  ngOnInit() {
    this.componentsService.getSchemas().subscribe((schemas) => {
      this.schema = schemas.get(this.component.type).triggers.get(this.type);
    });
  }

  launchActionsEditor() {
    this.dialogService.show(TriggersEditorDialogComponent, <IDialogInputs>{
      title: `Edit "${this.schema.name}" trigger actions`,
      project: this.project,
      addAction: (action: ProjectComponentTriggerAction) => {
        let actions = this.component.triggers.get(this.type);
        if (!actions) {
          actions = [];
          this.component.triggers.set(this.type, actions);
        }

        actions.push(action);

        console.log(`New action has been added ${action.action}!`);
      }
    });
  }
}
