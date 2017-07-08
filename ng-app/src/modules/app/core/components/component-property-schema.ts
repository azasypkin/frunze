import {TypedEntity} from '../typed-entity';

export class ComponentPropertySchema extends TypedEntity {
  /**
   * Default value of the property.
   * @type {string}
   */
  readonly defaultValue: string;

  constructor(type: string, name: string, description: string, defaultValue: string) {
    super(type, name, description);

    this.defaultValue = defaultValue;
  }
}
