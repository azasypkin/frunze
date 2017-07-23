import {Component, Input, OnChanges} from '@angular/core';
import {FormControl} from '@angular/forms'

import {PropertySchema, PredefinedPropertySchema} from '../../core/components/component-property-schema';
import {ProjectComponent} from '../../core/projects/project-component';

@Component({
  selector: 'frunze-property-editor',
  templateUrl: 'property-editor.component.html',
  styleUrls: ['property-editor.component.css']
})
export class PropertyEditorComponent implements OnChanges {
  @Input() component: ProjectComponent;
  @Input() schema: PropertySchema;

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

  isCustomValue() {
    return !this.isPredefinedValue();
  }

  isPredefinedValue() {
    return !!this.schema && this.schema instanceof PredefinedPropertySchema;
  }

  getPredefinedValues() {
    if (this.isPredefinedValue()) {
      return (<PredefinedPropertySchema>this.schema).options;
    }
  }
}
