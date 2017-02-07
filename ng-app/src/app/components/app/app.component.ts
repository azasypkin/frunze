import { Component } from '@angular/core';

@Component({
  selector: 'frunze-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  controlGroups = [{
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
  }, {
    name: 'Group#2',
    type: 'group#2',
    expanded: false,
    items: [{
      name: 'Item #1',
      type: 'type#1'
    }, {
      name: 'Item #2',
      type: 'type#2'
    }]
  }];
}
