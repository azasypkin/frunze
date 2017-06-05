export class ComponentMetadata {
  private _type: string;
  private _name: string;
  private _description: string;

  constructor(type: string, name: string, description: string) {
    this._type = type;
    this._name = name;
    this._description = description;
  }

  /**
   * Type of the component.
   * @returns {string}
   */
  get type() {
    return this._type;
  }

  /**
   * Localizable and human-readable component name.
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Localizable and human-readable component description.
   * @returns {string}
   */
  get description() {
    return this._description;
  }
}
