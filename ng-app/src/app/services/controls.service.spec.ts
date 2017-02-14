import {TestBed, async, inject} from '@angular/core/testing';
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {ControlGroup} from '../core/controls/control-group';
import {ControlMetadata} from '../core/controls/control-metadata';
import {ControlsService} from './controls.service';

describe('Services/ControlsService', () => {
  let service, backend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {provide: XHRBackend, useClass: MockBackend},
        ControlsService
      ]
    });
  }));

  beforeEach(inject([ControlsService, XHRBackend], (controlService, mockBackend) => {
    service = controlService;
    backend = mockBackend;
  }));

  it('getGroups() correctly calls backend to fetch control groups', async(() => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify([{
          type: 'test group#1',
          name: 'test Group #1',
          description: 'test Group #1 Description',
          items: [{type: 'test type#11', name: 'test Item #11', description: 'test Item #11 Description'}]
        }])
      });
      connection.mockRespond(new Response(options));
    });

    service.getGroups()
      .subscribe((groups: ControlGroup[]) => {
        expect(groups.length).toEqual(1);

        const group = groups[0];
        expect(group instanceof ControlGroup).toEqual(true);
        expect(group.type).toEqual('test group#1');
        expect(group.name).toEqual('test Group #1');
        expect(group.description).toEqual('test Group #1 Description');
        expect(group.items.length).toEqual(1);

        const item = group.items[0];
        expect(item instanceof ControlMetadata).toEqual(true);
        expect(item.type).toEqual('test type#11');
        expect(item.name).toEqual('test Item #11');
        expect(item.description).toEqual('test Item #11 Description');
      }, (e) => {
        console.error('Error occurred while retrieving of control groups.', e);
      });
  }));
});

