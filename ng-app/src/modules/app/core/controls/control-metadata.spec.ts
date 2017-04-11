import { ControlMetadata } from './control-metadata';

describe('Core/ControlMetadata', () => {
  it('all properties should be correctly initialized', () => {
    const metadata = new ControlMetadata('type', 'Name', 'Description');

    expect(metadata.type).toEqual('type');
    expect(metadata.name).toEqual('Name');
    expect(metadata.description).toEqual('Description');
  });
});
