import { ComponentGroup } from './component-group';
import { ComponentMetadata } from './component-metadata';

describe('Core/ComponentGroup', () => {
  it('all properties should be correctly initialized', () => {
    const group = new ComponentGroup('type', 'Name', 'Description');

    expect(group.type).toEqual('type');
    expect(group.name).toEqual('Name');
    expect(group.description).toEqual('Description');
    expect(group.items.length).toEqual(0);
  });

  it('all items should be correctly initialized', () => {
    let group = new ComponentGroup('type', 'Name', 'Description');

    expect(group.items.length).toEqual(0);

    const item1 = new ComponentMetadata('type1', 'Name1', 'Description1');
    const item2 = new ComponentMetadata('type2', 'Name2', 'Description2');

    group = new ComponentGroup('type', 'Name', 'Description', [item1, item2]);

    expect(group.items.length).toEqual(2);
    expect(group.items[0]).toEqual(item1);
    expect(group.items[1]).toEqual(item2);
  });
});
