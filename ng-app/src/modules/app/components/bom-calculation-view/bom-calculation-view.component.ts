import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import {ProjectService} from '../../services/project.service';
import {Project} from '../../core/projects/project';

@Component({
  templateUrl: 'bom-calculation-view.component.html',
  styleUrls: ['bom-calculation-view.component.css']
})
export class BomCalculationViewComponent implements OnInit {
  project: Project;

  constructor(private route: ActivatedRoute, private router: Router,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.route.params
        .switchMap((params: Params) => this.projectService.getProject(params['id']))
        .subscribe((project: Project) => this.project = project, (e) => {
          console.error('Error occurred while retrieving of project.', e);
        });
  }

  onNext() {
    this.projectService.saveProject(this.project).subscribe(() => {
      console.log('Project successfully saved.');
    });
  }

  onGoToProjectSoftware() {
    this.router.navigate([`promo/project/software/${this.project.id}`]);
  }
}
