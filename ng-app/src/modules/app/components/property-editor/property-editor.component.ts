import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms'
import {Project} from '../../core/projects/project';
import {ComponentSchema} from '../../core/components/component-schema';
import {
  PropertySchema,
  ComponentPropertySchema,
  PredefinedPropertySchema
} from '../../core/components/component-property-schema';
import {ComponentsService} from '../../services/components.service';
import {ProjectComponent} from '../../core/projects/project-component';


@Component({
  selector: 'frunze-property-editor',
  templateUrl: 'property-editor.component.html',
  styleUrls: ['property-editor.component.css']
})
export class PropertyEditorComponent implements OnChanges, OnInit {
  @Input() project: Project;
  @Input() component: ProjectComponent;
  @Input() schema: PropertySchema;

  componentSchemas: Map<string, ComponentSchema>;

  valueEditor = new FormControl();

  constructor(private componentsService: ComponentsService) {
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

  ngOnInit() {
    this.componentsService.getSchemas()
      .subscribe((schemas) => this.componentSchemas = schemas, (e) => {
        console.error('Error occurred while retrieving of component schemas.', e);
      });
  }

  isCustomValue() {
    return !this.isPredefinedValue() && !this.isComponentValue();
  }

  isPredefinedValue() {
    return !!this.schema && this.schema instanceof PredefinedPropertySchema;
  }

  isComponentValue() {
    return !!this.schema && this.schema instanceof ComponentPropertySchema;
  }

  getPredefinedValues() {
    if (this.isPredefinedValue()) {
      return (<PredefinedPropertySchema>this.schema).options;
    }
  }

  getComponents() {
    if (this.isComponentValue()) {
      const componentTypes = (<ComponentPropertySchema>this.schema).componentTypes;
      const components = [];

      for (const component of this.project.components) {
        if (!componentTypes.includes(component.type)) {
          continue;
        }

        components.push({ id: component.id, name: this.getComponentName(component) });
      }

      return components;
    }
  }

  private getComponentName(component: ProjectComponent) {
    return component.properties.get('name') ||
      this.componentSchemas.get(component.type).name;
  }
}
