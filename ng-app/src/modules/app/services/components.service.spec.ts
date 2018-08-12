import { async, inject, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Config } from '../config';

import { ComponentGroup } from '../core/components/component-group';
import { ComponentSchema } from '../core/components/component-schema';

import { ComponentsService } from './components.service';

describe('Services/ComponentsService', () => {
  let service, backend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Config, ComponentsService],
    });

    backend = TestBed.get(HttpTestingController);
  }));

  beforeEach(inject([ComponentsService], (componentService) => {
    service = componentService;
  }));

  it('getGroups() correctly calls backend to fetch component groups', async(() => {
    service.getGroups().subscribe(
      (groups: ComponentGroup[]) => {
        expect(groups.length).toEqual(1);

        const group = groups[0];
        expect(group instanceof ComponentGroup).toEqual(true);
        expect(group.type).toEqual('test group#1');
        expect(group.name).toEqual('test Group #1');
        expect(group.description).toEqual('test Group #1 Description');
        expect(group.items.length).toEqual(1);

        const item = group.items[0];
        expect(item instanceof ComponentSchema).toEqual(true);
        expect(item.type).toEqual('test type#11');
        expect(item.name).toEqual('test Item #11');
        expect(item.description).toEqual('test Item #11 Description');
      },
      (e) => {
        console.error(
          'Error occurred while retrieving of component groups.',
          e
        );
      }
    );

    backend.expectOne('http://0.0.0.0:8009/component-groups').flush([
      {
        type: 'test group#1',
        name: 'test Group #1',
        description: 'test Group #1 Description',
        items: ['test type#11'],
      },
    ]);

    backend.expectOne('http://0.0.0.0:8009/component-schemas').flush([
      {
        type: 'test type#11',
        name: 'test Item #11',
        description: 'test Item #11 Description',
        mpn: '2821',
        properties: {},
        actions: {},
        triggers: {},
      },
    ]);

    backend.verify();
  }));
});
