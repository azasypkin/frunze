import {TypedEntity} from '../typed-entity';
import {FirmwareProperty} from './firmware-property';
import {FirmwareActionHandler} from './firmware-action-handler';

/**
 * Class that describes firmware block.
 */
export class FirmwareBlock extends TypedEntity {
  constructor(_type: string, _name: string, _description: string, private _properties: Map<string, FirmwareProperty>,
              private _events: Array<TypedEntity>, private _handlers: Map<string, Array<FirmwareActionHandler>>) {
    super(_type, _name, _description);
  }

  /**
   * Returns firmware block properties.
   * @returns {Map<string, FirmwareProperty>}
   */
  get properties() {
    return this._properties;
  }

  /**
   * Returns supported firmware block events.
   * @returns {Array<TypedEntity>}
   */
  get events() {
    return this._events;
  }

  /**
   * Returns active action handlers.
   * @returns {Map<string, Array<FirmwareActionHandler>>}
   */
  get handlers() {
    return this._handlers;
  }
}
