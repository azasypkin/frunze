import {ProjectCapability} from './project-capability';

/**
 * Class that describes the specific project.
 */
export class Project {
  constructor(private _name: string = 'New Project', private _capabilities: ProjectCapability[]) {}

  /**
   * Name of the project.
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Project  capabilities.
   * @returns {ProjectCapability[]}
   */
  get capabilities() {
    return this._capabilities;
  }
}
