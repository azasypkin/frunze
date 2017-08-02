import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import {ComponentsService} from '../../services/components.service';
import {ProjectService} from '../../services/project.service';
import {BomService} from '../../services/bom.service';
import {Project} from '../../core/projects/project';
import {ProjectComponent} from '../../core/projects/project-component';
import {ComponentSchema} from '../../core/components/component-schema';
import {Part} from '../../core/bom/part';

@Component({
  templateUrl: 'bom-calculation-view.component.html',
  styleUrls: ['bom-calculation-view.component.css']
})
export class BomCalculationViewComponent implements OnInit {
  project: Project;
  componentSchemas: Map<string, ComponentSchema>;
  bom: {
    mpn: string,
    part: Part,
    component: ProjectComponent,
    schema: ComponentSchema
  }[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
              private bomService: BomService,
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
        .switchMap(([schemas, project]) => {
          this.project = project;
          this.componentSchemas = schemas;

          const mpns = [];
          for (const component of this.project.components) {
            const mpn = this.componentSchemas.get(component.type).mpn;
            if (!mpn) {
              continue;
            }
            mpns.push(mpn);
          }

          return this.bomService.getForMpns(mpns);
        })
        .subscribe((bom: Map<string, Part>) => {
          this.bom = Array.from(bom).map(([mpn, part]) => {
            const component = this.project.components.find((projectComponent) => {
              return this.componentSchemas.get(projectComponent.type).mpn === mpn;
            });

            return {mpn, part, component, schema: this.componentSchemas.get(component.type)};
          });
        }, (e) => {
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
