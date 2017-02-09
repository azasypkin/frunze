import { ControlGroup } from './control-group';
import { ControlMetadata } from './control-metadata';

describe('Core/ControlGroup', () => {
  it('all properties should be correctly initialized', () => {
    const group = new ControlGroup('type', 'Name', 'Description');

    expect(group.type).toEqual('type');
    expect(group.name).toEqual('Name');
    expect(group.description).toEqual('Description');
    expect(group.items.length).toEqual(0);
  });

  it('all items should be correctly initialized', () => {
    let group = new ControlGroup('type', 'Name', 'Description');

    expect(group.items.length).toEqual(0);

    const item1 = new ControlMetadata('type1', 'Name1', 'Description1');
    const item2 = new ControlMetadata('type2', 'Name2', 'Description2');

    group = new ControlGroup('type', 'Name', 'Description', [item1, item2]);

    expect(group.items.length).toEqual(2);
    expect(group.items[0]).toEqual(item1);
    expect(group.items[1]).toEqual(item2);
  });
});
