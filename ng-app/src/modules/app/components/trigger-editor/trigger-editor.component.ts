import {Component, Input} from '@angular/core';

import {ComponentTriggerSchema} from '../../core/components/component-trigger-schema';
import {Project} from '../../core/projects/project';
import {ProjectComponent} from '../../core/projects/project-component';

@Component({
  selector: 'frunze-trigger-editor',
  templateUrl: 'trigger-editor.component.html',
  styleUrls: ['trigger-editor.component.css']
})
export class TriggerEditorComponent {
  @Input() project: Project;
  @Input() component: ProjectComponent;
  @Input() schema: ComponentTriggerSchema;
}
