import {TestBed, async} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule, XHRBackend} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MockBackend} from '@angular/http/testing';
import {Observable} from 'rxjs/Observable';
import {By} from '@angular/platform-browser';

import {ActivatedRouteStub} from '../../../../testing/stubs/activated-route';
import {RouterStub} from '../../../../testing/stubs/router';

import {Config} from '../../config';

import {ComponentGroup} from '../../core/components/component-group';
import {ComponentSchema} from '../../core/components/component-schema';
import {Project} from '../../core/projects/project';

import {ComponentsService} from '../../services/components.service';
import {ProjectService} from '../../services/project.service';

import {SoftwareEditorViewComponent} from './software-editor-view.component';
import {
  ExpandableGroupsComponent
} from '../expandable-groups/expandable-groups.component';
import {PropertyEditorComponent} from '../property-editor/property-editor.component';
import {TriggerEditorComponent} from '../trigger-editor/trigger-editor.component';

describe('Components/SoftwareEditorViewComponent', () => {
  let fixture, componentsServiceSpy, projectServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, ReactiveFormsModule],
      declarations: [
        SoftwareEditorViewComponent,
        ExpandableGroupsComponent,
        PropertyEditorComponent,
        TriggerEditorComponent
      ],
      providers: [
        {provide: XHRBackend, useClass: MockBackend},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: Router, useClass: RouterStub},
        Config,
        ComponentsService,
        ProjectService
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SoftwareEditorViewComponent);
      const componentsService = fixture.debugElement.injector.get(ComponentsService);
      componentsServiceSpy = spyOn(componentsService, 'getGroups')
        .and.returnValue(Observable.of([
          new ComponentGroup('group#1test', 'Group #1 Test', 'Group #1 Description Test', [
            new ComponentSchema('type#11', 'Item #11', 'Item #11 Description', new Map(), new Map(), new Map()),
            new ComponentSchema('type#12', 'Item #12', 'Item #12 Description', new Map(), new Map(), new Map())
          ])
        ]));

      const projectService = fixture.debugElement.injector.get(ProjectService);
      projectServiceSpy = spyOn(projectService, 'getProject')
          .and.returnValue(Observable.of(new Project('', 'New Project', 'New Project Description', [], null, [])));

      const activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as ActivatedRouteStub;
      activatedRoute.setParameters({ id: '' });
    });
  }));

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render all main editor components', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const element = fixture.debugElement;
      expect(element.query(By.css('.frunze-software-editor__components frunze-expandable-groups'))).not.toBeNull();
      expect(element.query(By.css('.frunze-workspace-editor'))).not.toBeNull();
      // No component is selected, so this should not be rendered.
      expect(element.query(By.css('.frunze-software-editor__properties > frunze-expandable-groups'))).toBeNull();

      // Check that we have passed groups to ExpandedGroupsComponent correctly.
      const expandableGroupsComponent = element.query(By.css('frunze-expandable-groups')).componentInstance;
      expect(expandableGroupsComponent).toBeTruthy();
      expect(expandableGroupsComponent.groups.length).toEqual(1);
      expect(expandableGroupsComponent.groups[0].type).toEqual('group#1test');
    });
  }));
});
