/**
 * Class that describes the thing that have a unique type, human readable name and description.
 */
export class TypedEntity {
  /**
   * Unique type of the typed entity.
   * @type {string}
   */
  readonly type: string;

  /**
   * Human-readable name for the typed entity.
   * @type {string}
   */
  readonly name: string;

  /**
   * Human-readable description of the typed entity.
   * @type {string}
   */
  readonly description: string;

  constructor(type: string, name: string, description: string) {
    this.type = type;
    this.name = name;
    this.description = description;
  }
}
