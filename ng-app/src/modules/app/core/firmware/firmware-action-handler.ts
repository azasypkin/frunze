/**
 * Class that describes firmware action handler.
 */
export class FirmwareActionHandler {
  /**
   * Returns firmware action handler type.
   * @type {string}
   */
  readonly type: string;

  /**
   * Returns firmware action handler properties.
   * @type {Map<string, string>}
   */
  readonly properties: Map<string, string>;

  constructor(type: string, properties: Map<string, string>) {
    this.type = type;
    this.properties = properties;
  }
}
