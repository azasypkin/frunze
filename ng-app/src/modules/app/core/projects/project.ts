import {ProjectCapability} from './project-capability';
import {ProjectPlatform} from './project-platform';

/**
 * Class that describes the specific project.
 */
export class Project {
  constructor(private _id: string, private _name: string, private _description: string,
              private _capabilities: ProjectCapability[], private _platform: ProjectPlatform = null) {}

  /**
   * Identifier of the project.
   * @returns {string}
   */
  get id() {
    return this._id;
  }

  /**
   * Name of the project.
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Description of the project.
   * @returns {string}
   */
  get description() {
    return this._description;
  }

  /**
   * List of the project capabilities (from the list of supported capabilities).
   * @returns {ProjectCapability[]}
   */
  get capabilities() {
    return this._capabilities;
  }

  /**
   * Project platform (from the list of supported platforms).
   * @returns {ProjectPlatform}
   */
  get platform() {
    return this._platform;
  }

  /**
   * Produces simplified JSON version of the project.
   * @returns {{id: string, name: string, description: string, platform: string, capabilities: string[]}}
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      platform: this.platform.type,
      capabilities: this.capabilities.map((capability) => capability.type)
    };
  }
}
