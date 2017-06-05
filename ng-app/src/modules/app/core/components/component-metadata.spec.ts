import { ComponentMetadata } from './component-metadata';

describe('Core/ComponentMetadata', () => {
  it('all properties should be correctly initialized', () => {
    const metadata = new ComponentMetadata('type', 'Name', 'Description');

    expect(metadata.type).toEqual('type');
    expect(metadata.name).toEqual('Name');
    expect(metadata.description).toEqual('Description');
  });
});
