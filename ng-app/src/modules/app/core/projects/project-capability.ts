/**
 * Class that describes the specific project capability.
 */
export class ProjectCapability {
  constructor(private _type: string, private _name: string, private _hint: string) {}

  /**
   * Unique type of the project capability ('wifi', 'led' etc.).
   * @returns {string}
   */
  get type() {
    return this._type;
  }

  /**
   * Human-readable name for the project capability.
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Human-readable description of the project capability.
   * @returns {string}
   */
  get hint() {
    return this._hint;
  }
}