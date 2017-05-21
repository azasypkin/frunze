/**
 * Class that describes the thing that have a unique type, human readable name and description.
 */
export class TypedEntity {
  constructor(private _type: string, private _name: string, private _description: string) {}

  /**
   * Unique type of the typed entity.
   * @returns {string}
   */
  get type() {
    return this._type;
  }

  /**
   * Human-readable name for the typed entity.
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Human-readable description of the typed entity.
   * @returns {string}
   */
  get description() {
    return this._description;
  }
}
