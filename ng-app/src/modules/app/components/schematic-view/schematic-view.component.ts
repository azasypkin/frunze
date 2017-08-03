import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import {ComponentsService} from '../../services/components.service';
import {ProjectService} from '../../services/project.service';
import {Project} from '../../core/projects/project';
import {ComponentSchema} from '../../core/components/component-schema';

@Component({
  templateUrl: 'schematic-view.component.html',
  styleUrls: ['schematic-view.component.css']
})
export class SchematicViewComponent implements OnInit {
  project: Project;
  componentSchemas: Map<string, ComponentSchema>;

  constructor(private route: ActivatedRoute, private router: Router,
              private projectService: ProjectService,
              private componentsService: ComponentsService) {
  }

  ngOnInit(): void {
    this.route.params
        .switchMap((params: Params) => {
          return Observable.forkJoin(
            this.componentsService.getSchemas(),
            this.projectService.getProject(params['id'])
          )
        })
        .subscribe(([schemas, project]) => {
          this.project = project;
          this.componentSchemas = schemas;
        },(e) => {
          console.error('Error occurred while retrieving of project.', e)
        });
  }

  onNext() {
    this.projectService.saveProject(this.project).subscribe(() => {
      console.log('Project successfully saved.');
    });
  }

  onEdit() {
    this.router.navigate([`promo/project/bom/${this.project.id}`]);
  }
}
