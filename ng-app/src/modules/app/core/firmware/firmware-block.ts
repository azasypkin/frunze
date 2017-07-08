import {TypedEntity} from '../typed-entity';
import {FirmwareProperty} from './firmware-property';
import {FirmwareActionHandler} from './firmware-action-handler';

/**
 * Class that describes firmware block.
 */
export class FirmwareBlock extends TypedEntity {
  /**
   * Returns firmware block properties.
   * @type {Map<string, FirmwareProperty>}
   */
  readonly properties: Map<string, FirmwareProperty>;

  /**
   * Returns supported firmware block events.
   * @type {Array<TypedEntity>}
   */
  readonly events: Array<TypedEntity>;

  /**
   * Returns active action handlers.
   * @type {Map<string, Array<FirmwareActionHandler>>}
   */
  readonly handlers: Map<string, Array<FirmwareActionHandler>>;

  constructor(type: string, name: string, description: string, properties: Map<string, FirmwareProperty>,
              events: Array<TypedEntity>, handlers: Map<string, Array<FirmwareActionHandler>>) {
    super(type, name, description);

    this.properties = properties;
    this.events = events;
    this.handlers = handlers;
  }
}
