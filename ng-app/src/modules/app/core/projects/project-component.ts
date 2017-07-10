import {ProjectComponentTriggerAction} from './project-component-trigger-action';

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

  /**
   * Project component trigger actions map.
   * @type {Map<string, Array.<ProjectComponentTriggerAction>>}
   */
  readonly triggers: Map<string, ProjectComponentTriggerAction[]>;

  constructor(id: string, type: string, properties: Map<string, string>,
              triggers: Map<string, ProjectComponentTriggerAction[]>) {
    this.id = id;
    this.type = type;
    this.properties = properties;
    this.triggers = triggers;
  }

  /**
   * Produces simplified JSON version of the component.
   * @returns {{id: string, type: string, properties: Object}
   */
  toJSON() {
    return {
      id: this.id,
      type: this.type,
      properties: Array.from(this.properties.entries()).reduce((map, [key, value]) => {
        map[key] = value;
        return map;
      }, {}),
      triggers: Array.from(this.triggers.entries()).reduce((map, [key, actions]) => {
        map[key] = actions.map((action) => action.toJSON());
        return map;
      }, {})
    };
  }
}
