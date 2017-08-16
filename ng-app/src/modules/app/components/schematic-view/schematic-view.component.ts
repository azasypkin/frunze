import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import {ProjectService} from '../../services/project.service';
import {SchematicService} from '../../services/schematic.service';
import {Project} from '../../core/projects/project';

@Component({
  templateUrl: 'schematic-view.component.html',
  styleUrls: ['schematic-view.component.css']
})
export class SchematicViewComponent implements OnInit {
  project: Project;
  schematic: SafeUrl;

  constructor(private route: ActivatedRoute, private router: Router,
              private sanitizer: DomSanitizer,
              private projectService: ProjectService,
              private schematicService: SchematicService) {
  }

  ngOnInit(): void {
    this.route.params
        .switchMap((params: Params) => {
          return Observable.forkJoin(
            this.schematicService.getProjectSchematic(params['id']),
            this.projectService.getProject(params['id'])
          )
        })
        .subscribe(([schematic, project]) => {
          this.project = project;
          this.schematic = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(schematic));
        }, (e) => {
          console.error('Error occurred while retrieving of project schematic.', e)
        });
  }

  onNext() {
    window.URL.revokeObjectURL(this.schematic as string);

    this.projectService.saveProject(this.project).subscribe(() => {
      console.log('Project successfully saved.');
    });
  }

  onEdit() {
    window.URL.revokeObjectURL(this.schematic as string);

    this.router.navigate([`promo/project/bom/${this.project.id}`]);
  }
}
