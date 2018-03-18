import { TypedEntity } from '../typed-entity';

export class PropertySchema extends TypedEntity {
  /**
   * Default value of the property.
   * @type {string}
   */
  readonly defaultValue: string;

  constructor(
    type: string,
    name: string,
    description: string,
    defaultValue: string
  ) {
    super(type, name, description);
    this.defaultValue = defaultValue;
  }
}

export class PredefinedPropertySchema extends PropertySchema {
  /**
   * Possible property value options.
   * @type {TypedEntity[]}
   */
  readonly options: TypedEntity[];

  constructor(
    type: string,
    name: string,
    description: string,
    defaultValue: string,
    options: TypedEntity[]
  ) {
    super(type, name, description, defaultValue);

    this.options = options;
  }
}

export class ComponentPropertySchema extends PropertySchema {
  /**
   * Possible component types that can be assigned to this property.
   * @type {string[]}
   */
  readonly componentTypes: string[];

  constructor(
    type: string,
    name: string,
    description: string,
    defaultValue: string,
    componentTypes: string[]
  ) {
    super(type, name, description, defaultValue);
    this.componentTypes = componentTypes;
  }
}
