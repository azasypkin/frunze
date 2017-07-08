/**
 * Class that describes the specific project component.
 */
export class ProjectComponent {
  /**
   * Identifier of the project component.
   * @type {string}
   */
  readonly id: string;

  /**
   * Type of the project component.
   * @type {string}
   */
  readonly type: string;

  /**
   * Project component properties map.
   * @type {Map<string, string>}
   */
  readonly properties: Map<string, string>;

  constructor(id: string, type: string, properties: Map<string, string>) {
    this.id = id;
    this.type = type;
    this.properties = properties;
  }

  /**
   * Produces simplified JSON version of the component.
   * @returns {{id: string, type: string, properties: string[][]}}
   */
  toJSON() {
    return {
      id: this.id,
      type: this.type,
      properties: Array.from(this.properties.entries()).reduce((map, [key, value]) => {
        map[key] = value;
        return map;
      }, {})
    };
  }
}
