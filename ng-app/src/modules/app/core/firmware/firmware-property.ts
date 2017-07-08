import {TypedEntity} from '../typed-entity';

/**
 * Class that describes firmware property.
 */
export class FirmwareProperty extends TypedEntity {
  /**
   * Firmware property value.
   * @type {string}
   */
  value: string;

  constructor(type: string, name: string, description: string, value: string) {
    super(type, name, description);

    this.value = value;
  }
}
