import {Component, Input} from '@angular/core';

import {ProjectComponent} from '../../core/projects/project-component';

@Component({
  selector: 'frunze-properties',
  templateUrl: 'properties.component.html',
  styleUrls: ['properties.component.css']
})
export class PropertiesComponent {
  @Input() component: ProjectComponent = null;

  groups: {
    properties: {
      name: string,
      expanded: boolean,
      items: any[]
    },
    events: {
      name: string,
      expanded: boolean,
      items: any[]
    }
  } = {
    properties: null,
    events: null
  };

  constructor() {
    this.groups.properties = {
      name: 'Properties',
      expanded: false,
      items: []
    };

    this.groups.events = {
      name: 'Events',
      expanded: false,
      items: []
    };
  }

  removeComponent() {
    if (!this.component) {
      return;
    }
  }
}
