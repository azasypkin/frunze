import { ComponentMetadata } from './component-metadata';

// Global component group cache.
const groups = new Map<string, ComponentGroup>();

/**
 * ComponentGroup represents group of related components.
 */
export class ComponentGroup {
  private _type: string;
  private _name: string;
  private _description: string;
  private _items: Array<ComponentMetadata>;

  /**
   * Finds group for the specified component type.
   * @param {string} componentType Type of the component.
   * @returns {ComponentGroup}
   */
  static findByComponentType(componentType: string): ComponentGroup {
    let foundGroup = null;

    groups.forEach((group) => {
      if (!foundGroup &&
        group.items.some((meta) => meta.type === componentType)) {
        foundGroup = group;
      }
    });

    return foundGroup;
  }

  /**
   * Register new component group into static repository.
   * @param {string} type Type of the component group.
   * @param {string} name Name of the component group.
   * @param {string} description Description of the component group.
   * @param {Array<ComponentMetadata>} items Component list associated with the
   * group.
   * @returns {ComponentGroup} Registered component group
   */
  static register(
    type: string, name: string, description: string, items: ComponentMetadata[]
  ): ComponentGroup {
    if (groups.has(type)) {
      throw new Error('Group with type ' + type + ' is already registered!');
    }

    const group = new ComponentGroup(type, name, description, items);
    groups.set(type, group);

    return group;
  }

  static get(type: string): ComponentGroup {
    return groups.get(type);
  }

  constructor(type: string, name: string, description: string, items: Array<ComponentMetadata> = []) {
    this._type = type;
    this._name = name;
    this._description = description;
    this._items = items;
  }

  /**
   * Type of the component group.
   * @returns {string}
   */
  get type() {
    return this._type;
  }

  /**
   * Localizable and human-readable component group name.
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Localizable and human-readable component group description.
   * @returns {string}
   */
  get description() {
    return this._description;
  }

  /**
   * List of components associated with the group.
   * @returns {Array<ComponentMetadata>}
   */
  get items(): ComponentMetadata[] {
    return this._items;
  }
}
