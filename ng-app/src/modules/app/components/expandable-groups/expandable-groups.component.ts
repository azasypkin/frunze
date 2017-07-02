import {Component, Input, TemplateRef, ContentChild} from '@angular/core';

interface IExpandableGroupItem {
  name: string;
  type: string;
}

export interface IExpandableGroup {
  name: string;
  type: string;
  expanded: boolean;
  items: IExpandableGroupItem[];
}

@Component({
  selector: 'frunze-expandable-groups',
  templateUrl: 'expandable-groups.component.html',
  styleUrls: ['expandable-groups.component.css']
})
export class ExpandableGroupsComponent {
  @Input() groups: IExpandableGroup[] = [];

  @ContentChild(TemplateRef)
  public itemTemplate: TemplateRef<any>;
}
