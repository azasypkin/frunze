import {TypedEntity} from '../typed-entity';
import {ComponentSchema} from './component-schema';

/**
 * ComponentGroup represents group of related components.
 */
export class ComponentGroup extends TypedEntity {
  /**
   * List of components associated with the group.
   * @type {Array<ComponentSchema>}
   */
  readonly items: ComponentSchema[];

  constructor(type: string, name: string, description: string, items: ComponentSchema[]) {
    super(type, name, description);

    this.items = items;
  }
}
