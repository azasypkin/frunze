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
    info: {
      name: string,
      expanded: boolean,
      items: any[]
    },
    properties: {
      name: string,
      expanded: boolean,
      items: any[]
    },
    events: {
      name: string,
      expanded: boolean,
      items: any[]
    },
    triggers: {
      name: string,
      expanded: boolean,
      items: any[]
    }
  } = {
    info: null,
    properties: null,
    events: null,
    triggers: null
  };

  constructor() {
    // TODO: Implement.
    this.groups.info = {
      name: 'Info',
      expanded: false,
      items: []
    };

    this.groups.properties = {
      name: 'Common Properties',
      expanded: false,
      items: []
    };

    this.groups.events = {
      name: 'Actions',
      expanded: false,
      items: []
    };

    this.groups.triggers = {
      name: 'Triggers',
      expanded: false,
      items: []
    };
  }

  removeComponent() {
    // TODO: Implement.
    if (!this.component) {
      return;
    }

    // this.activeComponent.remove();
  }

  addTrigger() {
    // TODO: Implement.
  }
}
