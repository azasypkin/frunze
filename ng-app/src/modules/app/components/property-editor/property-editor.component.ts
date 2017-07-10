import {Component, Input, OnChanges} from '@angular/core';
import {FormControl} from '@angular/forms'

import {ComponentPropertySchema, ComponentPropertyValueKind} from '../../core/components/component-property-schema';

interface IProperty {
  schema: ComponentPropertySchema;
  storage: Map<string, string>;
}

@Component({
  selector: 'frunze-property-editor',
  templateUrl: 'property-editor.component.html',
  styleUrls: ['property-editor.component.css']
})
export class PropertyEditorComponent implements OnChanges {
  @Input() property: IProperty;
  valueEditor = new FormControl();

  constructor() {
    this.valueEditor.valueChanges.subscribe(() => {
      this.property.storage.set(this.property.schema.type, this.valueEditor.value);
    });
  }

  ngOnChanges() {
    const value = !this.property ?
      '' :
      this.property.storage.get(this.property.schema.type) || this.property.schema.defaultValue;
    this.valueEditor.setValue(value)
  }

  isStringValue() {
    return this.property.schema.kind === ComponentPropertyValueKind.String;
  }

  isOptionsValue() {
    return this.property.schema.kind === ComponentPropertyValueKind.Options;
  }
}
