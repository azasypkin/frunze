import {TypedEntity} from '../typed-entity';
import {ComponentSchema} from './component-schema';

/**
 * ComponentGroup represents group of related components.
 */
export class ComponentGroup extends TypedEntity {
  constructor(_type: string, _name: string, _description: string,
              private _items: ComponentSchema[]) {
    super(_type, _name, _description);
  }

  /**
   * List of components associated with the group.
   * @returns {Array<ComponentSchema>}
   */
  get items(): ComponentSchema[] {
    return this._items;
  }
}
