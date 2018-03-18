import { TypedEntity } from '../typed-entity';
import { PropertySchema } from './component-property-schema';
import { ComponentActionSchema } from './component-action-schema';
import { ComponentTriggerSchema } from './component-trigger-schema';

export class ComponentSchema extends TypedEntity {
  /**
   * The manufacturer number of the real hardware part associated with the component if any.
   * Empty string if component is not associated with any dedicated hardware part.
   * @type {string}
   */
  readonly mpn: string;

  /**
   * Component property type <-> property schema map.
   * @type {Map<string, PropertySchema>}
   */
  readonly properties: Map<string, PropertySchema>;

  /**
   * Component action type <-> action schema map.
   * @type {Map<string, ComponentActionSchema>}
   */
  readonly actions: Map<string, ComponentActionSchema>;

  /**
   * Component trigger type <-> trigger schema map.
   * @type {Map<string, ComponentTriggerSchema>}
   */
  readonly triggers: Map<string, ComponentTriggerSchema>;

  constructor(
    type: string,
    name: string,
    description: string,
    mpn: string,
    properties: Map<string, PropertySchema>,
    actions: Map<string, ComponentActionSchema>,
    triggers: Map<string, ComponentTriggerSchema>
  ) {
    super(type, name, description);

    this.mpn = mpn;
    this.properties = properties;
    this.actions = actions;
    this.triggers = triggers;
  }
}
