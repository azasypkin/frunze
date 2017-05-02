import {ProjectCapability} from './project-capability';
import {ProjectPlatform} from './project-platform';

/**
 * Class that describes the specific project.
 */
export class Project {
  constructor(private _name: string, private _description: string, private _capabilities: ProjectCapability[],
              private _platform: ProjectPlatform = null) {}

  /**
   * Name of the project.
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Name of the description.
   * @returns {string}
   */
  get description() {
    return this._description;
  }

  /**
   * Project capabilities.
   * @returns {ProjectCapability[]}
   */
  get capabilities() {
    return this._capabilities;
  }

  /**
   * Project platform (from the supported list of platforms).
   * @returns {ProjectPlatform}
   */
  get platform() {
    return this._platform;
  }
}
