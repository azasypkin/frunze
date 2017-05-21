import {TypedEntity} from '../typed-entity';

/**
 * Class that describes firmware property.
 */
export class FirmwareProperty extends TypedEntity {
  constructor(_type: string, _name: string, _description: string, private _value: string) {
    super(_type, _name, _description);
  }

  /**
   * Returns firmware property value.
   * @returns {string}
   */
  get value() {
    return this._value;
  }

  /**
   * Sets firmware property value.
   * @param {string} value Value to set.
   */
  set value(value) {
    this._value = value;
  }
}
