import {TypedEntity} from '../typed-entity';
import {ComponentPropertySchema} from './component-property-schema';

export class ComponentSchema extends TypedEntity {
  constructor(_type: string, _name: string, _description: string,
              private _properties: Map<string, ComponentPropertySchema>) {
    super(_type, _name, _description);
  }

  /**
   * Component property <-> property schema map.
   * @returns {Map<string, ComponentPropertySchema>}
   */
  get properties() {
    return this._properties;
  }
}
