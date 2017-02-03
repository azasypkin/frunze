import {Component} from '@angular/core';

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
  selector: 'expandable-groups',
  inputs: ['groups'],
  templateUrl: 'expandable-groups.component.html',
  styleUrls: ['expandable-groups.component.css']
})
export class ExpandableGroups {
  groups: IExpandableGroup[] = [];

  toggleGroupState(group: IExpandableGroup) {
    group.expanded = !group.expanded;
  }

  onDragStart(e: DragEvent,
              group: IExpandableGroup,
              item: IExpandableGroupItem) {
    e.dataTransfer.setData(`text/${group.type}`, item.type);
  }
}
