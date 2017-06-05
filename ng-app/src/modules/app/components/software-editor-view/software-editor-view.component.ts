import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import {ProjectService} from '../../services/project.service';
import {Project} from '../../core/projects/project';
import {ComponentGroup} from '../../core/components/component-group';
import {ComponentsService} from '../../services/components.service';

@Component({
  templateUrl: 'software-editor-view.component.html',
  styleUrls: ['software-editor-view.component.css']
})
export class SoftwareEditorViewComponent implements OnInit {
  project: Project;
  componentGroups: ComponentGroup[] = [];

  constructor(private route: ActivatedRoute, private projectService: ProjectService,
              private componentsService: ComponentsService) {
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
   * Fetches groups from the ComponentsService.
   */
  private fetchGroups() {
    this.componentsService.getGroups()
        .subscribe((groups) => this.componentGroups = groups, (e) => {
          console.error('Error occurred while retrieving of component groups.', e);
        });
  }
}
