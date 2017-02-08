import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { WorkspaceComponent } from './workspace.component';

describe('WorkspaceComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspaceComponent],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(WorkspaceComponent);
    const expandableGroups = fixture.debugElement.componentInstance;
    expect(expandableGroups).toBeTruthy();
  }));

  it(`should render pager control correctly`, () => {
    const fixture = TestBed.createComponent(WorkspaceComponent);
    const element = fixture.debugElement;

    element.componentInstance.pages = [{
      id: 'page#1',
      name: 'Page #1'
    }, {
      id: 'page#2',
      name: 'Page #2'
    }, {
      id: 'page#3',
      name: 'Page #3'
    }];

    fixture.detectChanges();

    const pageNodes = element.queryAll(By.css('.workspace-pager__page'));

    expect(pageNodes.length).toEqual(3);
    expect(pageNodes[0].childNodes[0].nativeNode.textContent.trim()).toEqual('Page #1');
    expect(pageNodes[1].childNodes[0].nativeNode.textContent.trim()).toEqual('Page #2');
    expect(pageNodes[2].childNodes[0].nativeNode.textContent.trim()).toEqual('Page #3');
  });

  it(`page should be removed successfully`, () => {
    const fixture = TestBed.createComponent(WorkspaceComponent);
    const element = fixture.debugElement;

    element.componentInstance.pages = [{
      id: 'page#1',
      name: 'Page #1'
    }, {
      id: 'page#2',
      name: 'Page #2'
    }, {
      id: 'page#3',
      name: 'Page #3'
    }];

    fixture.detectChanges();

    let pageNodes = element.queryAll(By.css('.workspace-pager__page'));
    let removeButtonNode = pageNodes[0].query(By.css('.workspace-pager__page__remove'));
    expect(removeButtonNode).toBeTruthy();

    removeButtonNode.triggerEventHandler('click', null);
    fixture.detectChanges();
    pageNodes = element.queryAll(By.css('.workspace-pager__page'));
    expect(pageNodes.length).toEqual(2);

    removeButtonNode = pageNodes[0].query(By.css('.workspace-pager__page__remove'));
    expect(removeButtonNode).toBeTruthy();

    removeButtonNode.triggerEventHandler('click', null);
    fixture.detectChanges();
    pageNodes = element.queryAll(By.css('.workspace-pager__page'));
    expect(pageNodes.length).toEqual(1);

    // It should be impossible to delete the last page.
    removeButtonNode = pageNodes[0].query(By.css('.workspace-pager__page__remove'));
    expect(removeButtonNode).toBeNull();
  });
});
