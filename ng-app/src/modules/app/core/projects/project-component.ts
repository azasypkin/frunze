/**
 * Class that describes the specific project component.
 */
export class ProjectComponent {
  constructor(private _id: string, private _type: string, private _properties: Map<string, string>) {
  }

  /**
   * Identifier of the project component.
   * @returns {string}
   */
  get id() {
    return this._id;
  }

  /**
   * Type of the project component.
   * @returns {string}
   */
  get type() {
    return this._type;
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
   * @returns {{id: string, type: string, properties: string[][]}}
   */
  toJSON() {
    return {
      id: this._id,
      type: this.type,
      properties: Array.from(this._properties.entries()).reduce((map, [key, value]) => {
        map[key] = value;
        return map;
      }, {})
    };
  }
}
