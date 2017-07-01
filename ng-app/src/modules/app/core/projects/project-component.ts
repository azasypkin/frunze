import {TypedEntity} from '../typed-entity';

/**
 * Class that describes the specific project component.
 */
export class ProjectComponent extends TypedEntity {
  constructor(private _id: string, _type: string, _name: string, _description: string,
              private _properties: Map<string, string>) {
    super(_type, _name, _description);
  }

  /**
   * Identifier of the project component.
   * @returns {string}
   */
  get id() {
    return this._id;
  }

  /**
   * Project component properties map.
   * @returns {Map<string, string>}
   */
  get properties() {
    return this._properties;
  }

  /**
   * Produces simplified JSON version of the component.
   * @returns {{id: string, type: string, name: string, description: string, properties: string[][]}}
   */
  toJSON() {
    return {
      id: this._id,
      // TODO: Type name and description should not be passed to backend, we should have centralized store of metadata.
      type: this.type,
      name: this.name,
      description: this.description,
      properties: Array.from(this._properties.entries()).reduce((map, [key, value]) => {
        map[key] = value;
        return map;
      }, {})
    };
  }
}
