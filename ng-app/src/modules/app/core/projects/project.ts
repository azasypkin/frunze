import {ProjectCapability} from './project-capability';
import {ProjectPlatform} from './project-platform';

/**
 * Class that describes the specific project.
 */
export class Project {
  constructor(private _name: string = 'New Project', private _capabilities: ProjectCapability[],
              private _platform: ProjectPlatform) {}

  /**
   * Name of the project.
   * @returns {string}
   */
  get name() {
    return this._name;
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
