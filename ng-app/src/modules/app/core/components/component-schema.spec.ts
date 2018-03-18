import { ComponentSchema } from './component-schema';

describe('Core/ComponentSchema', () => {
  it('all properties should be correctly initialized', () => {
    const metadata = new ComponentSchema(
      'type',
      'Name',
      'Description',
      'Mpn',
      new Map(),
      new Map(),
      new Map()
    );

    expect(metadata.type).toEqual('type');
    expect(metadata.name).toEqual('Name');
    expect(metadata.description).toEqual('Description');
    expect(metadata.mpn).toEqual('Mpn');
  });
});
