import { TestBed, async } from '@angular/core/testing';

import { ExpandableGroupsComponent } from './expandable-groups.component';

describe('Components/ExpandableGroupsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandableGroupsComponent],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(ExpandableGroupsComponent);
    const expandableGroups = fixture.debugElement.componentInstance;
    expect(expandableGroups).toBeTruthy();
  }));

  it('should render every group', async(() => {
    const fixture = TestBed.createComponent(ExpandableGroupsComponent);
    fixture.detectChanges();

    const element = fixture.debugElement.nativeElement;
    const component = fixture.debugElement.componentInstance;

    // By default component doesn't have any groups to render.
    expect(component.groups.length).toEqual(0);
    expect(element.querySelectorAll('.expandable-group').length).toEqual(0);

    // Let's set two groups.
    component.groups = [{
      name: 'Group#1',
      type: 'group#1',
      expanded: false,
      items: []
    }, {
      name: 'Group#2',
      type: 'group#2',
      expanded: false,
      items: []
    }];

    fixture.detectChanges();
    expect(element.querySelectorAll('.expandable-group').length).toEqual(2);

    // Add one more.
    component.groups.push({
      name: 'Group#3',
      type: 'group#3',
      expanded: false,
      items: []
    });
    fixture.detectChanges();
    expect(element.querySelectorAll('.expandable-group').length).toEqual(3);

    // Remove first two old groups.
    component.groups.splice(0, 2);
    fixture.detectChanges();
    expect(element.querySelectorAll('.expandable-group').length).toEqual(1);
  }));

  it('should render group content correctly', async(() => {
    const fixture = TestBed.createComponent(ExpandableGroupsComponent);
    const element = fixture.debugElement.nativeElement;
    const component = fixture.debugElement.componentInstance;

    component.groups = [{
      name: 'Group#1',
      type: 'group#1',
      expanded: false,
      items: [{
        name: 'Item #1',
        type: 'type#1'
      }, {
        name: 'Item #2',
        type: 'type#2'
      }]
    }];
    fixture.detectChanges();

    fixture.detectChanges();

    const groupNode = element.querySelector('.expandable-group');
    expect(groupNode).toBeTruthy();
    expect(groupNode.querySelector('.expandable-group__header').textContent.trim()).toEqual('Group#1');

    // Check number of group item nodes.
    const groupItemNodes = groupNode.querySelectorAll('.expandable-group__item');
    expect(groupItemNodes.length).toBe(2);

    // Check content of every item.
    expect(groupItemNodes[0].textContent.trim()).toEqual('Item #1');
    expect(groupItemNodes[1].textContent.trim()).toEqual('Item #2');
  }));
});
