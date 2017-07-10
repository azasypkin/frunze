import {Component, Input} from '@angular/core';

import {ComponentTriggerSchema} from '../../core/components/component-trigger-schema';

interface ITrigger {
  schema: ComponentTriggerSchema;
  storage: Map<string, string>;
}

@Component({
  selector: 'frunze-trigger-editor',
  templateUrl: 'trigger-editor.component.html',
  styleUrls: ['trigger-editor.component.css']
})
export class TriggerEditorComponent {
  @Input() trigger: ITrigger;
}
