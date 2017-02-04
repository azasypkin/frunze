import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'Frunze is up and running!';
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
