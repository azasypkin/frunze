import { Component, OnInit } from '@angular/core';

import { ControlGroup } from '../../core/controls/control-group';
import { ControlsService } from '../../services/controls.service';

@Component({
  selector: 'frunze-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  controlGroups: ControlGroup[] = [];

  constructor(private controlsService: ControlsService) {}

  ngOnInit(): void {
    this.fetchGroups();
  }

  /**
   * Fetches groups from the ControlsService.
   */
  private fetchGroups() {
    this.controlsService.getGroups().then((groups) => {
      this.controlGroups = groups;
    }, (e) => {
      console.error('Error occurred while retrieving of control groups.', e);
    });
  }
}
