import {Component, OnInit} from '@angular/core';

import {ProjectService} from '../../../app/services/project.service';
import {Project} from '../../../app/core/projects/project';

@Component({
  templateUrl: 'projects-view.component.html',
  styleUrls: ['projects-view.component.css']
})
export class ProjectsViewComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe((projects) => this.projects = projects);
  }

  deleteProject(project: Project, index: number) {
    this.projectService.deleteProject(project.id).subscribe(() => {
      this.projects.splice(index, 1);
    });
  }
}
