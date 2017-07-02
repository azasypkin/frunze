import {TypedEntity} from '../typed-entity';

export class ComponentPropertySchema extends TypedEntity {
  constructor(_type: string, _name: string, _description: string, private _default: string) {
    super(_type, _name, _description);
  }

  /**
   * Default value of the property.
   * @returns {String}
   */
  get default() {
    return this._default;
  }
}
