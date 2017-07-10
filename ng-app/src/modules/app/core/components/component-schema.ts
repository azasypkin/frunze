import {TypedEntity} from '../typed-entity';
import {ComponentPropertySchema} from './component-property-schema';
import {ComponentActionSchema} from './component-action-schema';
import {ComponentTriggerSchema} from './component-trigger-schema';

export class ComponentSchema extends TypedEntity {
  /**
   * Component property type <-> property schema map.
   * @type {Map<string, ComponentPropertySchema>}
   */
  readonly properties: Map<string, ComponentPropertySchema>;

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

  constructor(type: string, name: string, description: string,
              properties: Map<string, ComponentPropertySchema>,
              actions: Map<string, ComponentActionSchema>,
              triggers: Map<string, ComponentTriggerSchema>) {
    super(type, name, description);

    this.properties = properties;
    this.actions = actions;
    this.triggers = triggers;
  }
}
