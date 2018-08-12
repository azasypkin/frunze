import { Component, Input, TemplateRef, ContentChild } from '@angular/core';

export interface IExpandableGroup {
  name: string;
  expanded: boolean;
  items: any[];
}

@Component({
  selector: 'frunze-expandable-groups',
  templateUrl: 'expandable-groups.component.html',
  styleUrls: ['expandable-groups.component.css'],
})
export class ExpandableGroupsComponent {
  @Input()
  groups: IExpandableGroup[] = [];

  @ContentChild(TemplateRef)
  public itemTemplate: TemplateRef<any>;
}
