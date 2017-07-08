import {TypedEntity} from '../typed-entity';
import {ComponentPropertySchema} from './component-property-schema';

export class ComponentSchema extends TypedEntity {
  /**
   * Component property <-> property schema map.
   * @type {Map<string, ComponentPropertySchema>}
   */
  readonly properties: Map<string, ComponentPropertySchema>;

  constructor(type: string, name: string, description: string,
              properties: Map<string, ComponentPropertySchema>) {
    super(type, name, description);

    this.properties = properties;
  }
}
