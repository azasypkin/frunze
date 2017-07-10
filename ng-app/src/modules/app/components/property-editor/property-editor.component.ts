import {Component, Input, OnChanges} from '@angular/core';
import {FormControl} from '@angular/forms'

import {ComponentPropertySchema, ComponentPropertyValueKind} from '../../core/components/component-property-schema';
import {ProjectComponent} from '../../core/projects/project-component';

@Component({
  selector: 'frunze-property-editor',
  templateUrl: 'property-editor.component.html',
  styleUrls: ['property-editor.component.css']
})
export class PropertyEditorComponent implements OnChanges {
  @Input() component: ProjectComponent;
  @Input() schema: ComponentPropertySchema;

  valueEditor = new FormControl();

  constructor() {
    this.valueEditor.valueChanges.subscribe(() => {
      this.component.properties.set(this.schema.type, this.valueEditor.value);
    });
  }

  ngOnChanges() {
    const value = !this.component ?
      '' :
      this.component.properties.get(this.schema.type) || this.schema.defaultValue;
    this.valueEditor.setValue(value)
  }

  isStringValue() {
    return !!this.schema && this.schema.kind === ComponentPropertyValueKind.String;
  }

  isOptionsValue() {
    return !!this.schema && this.schema.kind === ComponentPropertyValueKind.Options;
  }
}
