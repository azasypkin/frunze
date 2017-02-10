import { Injectable } from '@angular/core';

import { ControlGroup } from '../core/controls/control-group';
import { ControlMetadata } from '../core/controls/control-metadata';

@Injectable()
export class ControlsService {
  private groups: ControlGroup[];

  constructor() {
    this.groups = [
      new ControlGroup('group#1', 'Group #1', 'Group #1 Description', [
        new ControlMetadata('type#11', 'Item #11', 'Item #11 Description'),
        new ControlMetadata('type#12', 'Item #12', 'Item #12 Description')
      ]),
      new ControlGroup('group#2', 'Group #2', 'Group #2 Description', [
        new ControlMetadata('type#21', 'Item #21', 'Item #21 Description'),
        new ControlMetadata('type#22', 'Item #22', 'Item #22 Description')
      ])
    ];
  }

  getGroups(): Promise<ControlGroup[]> {
    // TODO: Obviously here we should return new list with _frozen_ objects, for now it is not required.
    return Promise.resolve(this.groups);
  }
}