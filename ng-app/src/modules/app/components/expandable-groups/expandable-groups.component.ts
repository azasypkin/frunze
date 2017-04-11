import {Component, Input} from '@angular/core';

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

  toggleGroupState(group: IExpandableGroup) {
    group.expanded = !group.expanded;
  }

  onDragStart(e: DragEvent,
              group: IExpandableGroup,
              item: IExpandableGroupItem) {
    e.dataTransfer.setData(`text/${group.type}`, item.type);
  }
}
