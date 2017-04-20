import {ProjectCapability} from './project-capability';

/**
 * Class that describes high level project capability group.
 */
export class ProjectCapabilityGroup {
  constructor(private _type: string, private _name: string, private _hint: string,
              private _capabilities: ProjectCapability[]) {}

  /**
   * Unique type of the project capability group ('connectivity', 'input' etc.).
   * @returns {string}
   */
  get type() {
    return this._type;
  }

  /**
 * Human-readable name for the project capability group.
 * @returns {string}
 */
get name() {
  return this._name;
}

  /**
   * Human-readable description of the project capability group.
   * @returns {string}
   */
  get hint() {
    return this._hint;
  }

  /**
   * Project group capabilities.
   * @returns {ProjectCapability[]}
   */
  get capabilities() {
    return this._capabilities;
  }
}
