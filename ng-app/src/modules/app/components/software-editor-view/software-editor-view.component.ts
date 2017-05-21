import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import {ProjectService} from '../../services/project.service';
import {Project} from '../../core/projects/project';
import {ControlGroup} from '../../core/controls/control-group';
import {ControlsService} from '../../services/controls.service';

@Component({
  templateUrl: 'software-editor-view.component.html',
  styleUrls: ['software-editor-view.component.css']
})
export class SoftwareEditorViewComponent implements OnInit {
  project: Project;
  controlGroups: ControlGroup[] = [];

  constructor(private route: ActivatedRoute, private projectService: ProjectService,
              private controlsService: ControlsService) {
  }

  ngOnInit(): void {
    this.fetchGroups();

    this.route.params
        .switchMap((params: Params) => this.projectService.getProject(params['id']))
        .subscribe((project: Project) => this.project = project, (e) => {
          console.error('Error occurred while retrieving of project.', e);
        });
  }

  /**
   * Fetches groups from the ControlsService.
   */
  private fetchGroups() {
    this.controlsService.getGroups()
        .subscribe((groups) => this.controlGroups = groups, (e) => {
          console.error('Error occurred while retrieving of control groups.', e);
        });
  }
}
