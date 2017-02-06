import {Component} from '@angular/core';

@Component({
  selector: 'frunze-properties',
  templateUrl: 'properties.component.html',
  styleUrls: ['properties.component.css']
})
export class Properties {
  private activeControl: any = null;

  private groups: {
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
    styles: {
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
    styles: null,
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

    this.groups.styles = {
      name: 'Appearance',
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

  private removeControl() {
    // TODO: Implement.
    if (!this.activeControl) {
      return;
    }

    this.activeControl.remove();
  }

  private addTrigger() {
    // TODO: Implement.
  }
}
