/**
 * Class that describes firmware action handler.
 */
export class FirmwareActionHandler {
  constructor(private _type: string, private _properties: Map<string, string>) {
  }

  /**
   * Returns firmware action handler type.
   * @returns {string}
   */
  get type() {
    return this._type;
  }

  /**
   * Returns firmware action handler properties.
   * @returns {Map<string, string>}
   */
  get properties() {
    return this._properties;
  }
}
