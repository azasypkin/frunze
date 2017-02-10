import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ControlGroup } from '../../core/controls/control-group';
import { ControlMetadata } from '../../core/controls/control-metadata';

import { ControlsService } from '../../services/controls.service';

import { AppComponent } from './app.component';
import {
  ExpandableGroupsComponent
} from '../expandable-groups/expandable-groups.component';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { PropertiesComponent } from '../properties/properties.component';


describe('Components/AppComponent', () => {
  let fixture, controlsServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ExpandableGroupsComponent,
        WorkspaceComponent,
        PropertiesComponent
      ],
      providers: [ControlsService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      const controlsService = fixture.debugElement.injector.get(ControlsService);
      controlsServiceSpy = spyOn(controlsService, 'getGroups')
        .and.returnValue(Promise.resolve([
          new ControlGroup('group#1test', 'Group #1 Test', 'Group #1 Description Test', [
            new ControlMetadata('type#11', 'Item #11', 'Item #11 Description'),
            new ControlMetadata('type#12', 'Item #12', 'Item #12 Description')
          ])
        ]));
    });
  }));

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should render all main editor components`, async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const element = fixture.debugElement;
      expect(element.query(By.css('frunze-expandable-groups'))).not.toBeNull();
      expect(element.query(By.css('frunze-workspace'))).not.toBeNull();
      expect(element.query(By.css('frunze-properties'))).not.toBeNull();

      // Check that we have passed groups to ExpandedGroupsComponent correctly.
      const expandableGroupsComponent = element.query(By.css('frunze-expandable-groups')).componentInstance;
      expect(expandableGroupsComponent).toBeTruthy();
      expect(expandableGroupsComponent.groups.length).toEqual(1);
      expect(expandableGroupsComponent.groups[0].type).toEqual('group#1test');
    });
  }));
});
