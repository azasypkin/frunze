import {TypedEntity} from '../typed-entity';

/**
 * Describes possible value kinds.
 * @enum
 */
export enum ComponentPropertyValueKind {
  String = 'string',
  Options = 'options'
}

export class ComponentPropertySchema extends TypedEntity {
  /**
   * Default value of the property.
   * @type {string}
   */
  readonly defaultValue: string;

  /**
   * Kind of the property value.
   * @type {ComponentPropertyValueKind}
   */
  readonly kind: ComponentPropertyValueKind;

  /**
   * Possible property value options.
   * @type {Array.<TypedEntity>}
   */
  readonly options: TypedEntity[];

  constructor(type: string, name: string, description: string, defaultValue: string,
              kind: string, options: TypedEntity[] = []) {
    super(type, name, description);

    this.defaultValue = defaultValue;
    this.kind = kind === ComponentPropertyValueKind.Options ?
      ComponentPropertyValueKind.Options :
      ComponentPropertyValueKind.String;
    this.options = options;
  }
}
