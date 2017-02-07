import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {
  ExpandableGroupsComponent
} from '../expandable-groups/expandable-groups.component';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { PropertiesComponent } from '../properties/properties.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ExpandableGroupsComponent,
        WorkspaceComponent,
        PropertiesComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should render all main editor components`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('frunze-expandable-groups')).not.toBeNull();
    expect(compiled.querySelector('frunze-workspace')).not.toBeNull();
    expect(compiled.querySelector('frunze-properties')).not.toBeNull();
  }));
});
