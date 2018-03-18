import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import { ComponentsService } from '../../services/components.service';
import { ProjectService } from '../../services/project.service';
import { BomService } from '../../services/bom.service';
import { Project } from '../../core/projects/project';
import { ComponentSchema } from '../../core/components/component-schema';
import { Part } from '../../core/bom/part';

@Component({
  templateUrl: 'bom-calculation-view.component.html',
  styleUrls: ['bom-calculation-view.component.css'],
})
export class BomCalculationViewComponent implements OnInit {
  project: Project;
  bom: {
    items: {
      mpn: string;
      count: number;
      url: string;
      price: number;
      schema: ComponentSchema;
    }[];
    totalPrice: number;
  } = {
    items: [],
    totalPrice: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bomService: BomService,
    private projectService: ProjectService,
    private componentsService: ComponentsService
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        return Observable.forkJoin(
          this.componentsService.getSchemas(),
          this.projectService.getProject(params['id'])
        );
      })
      .switchMap(([schemas, project]) => {
        this.project = project;
        return this.bomService.getForMpns(
          this.updateProjectMPNs(schemas, project)
        );
      })
      .subscribe(
        (bom: Map<string, Part>) => this.updatePrices(bom),
        (e) => console.error('Error occurred while retrieving of project.', e)
      );
  }

  onNext() {
    this.projectService.saveProject(this.project).subscribe(() => {
      this.router.navigate([`promo/project/schematic/${this.project.id}`]);
    });
  }

  onEdit() {
    this.router.navigate([`promo/project/software/${this.project.id}`]);
  }

  private updateProjectMPNs(
    schemas: Map<string, ComponentSchema>,
    project: Project
  ) {
    this.bom.items = [];
    const mpns = new Set<string>();
    for (const component of this.project.components) {
      const schema = schemas.get(component.type);
      if (!schema.mpn) {
        continue;
      }

      if (mpns.has(schema.mpn)) {
        this.bom.items.find((item) => item.mpn === schema.mpn).count++;
      } else {
        this.bom.items.push({
          mpn: schema.mpn,
          count: 1,
          url: '',
          price: 0,
          schema: schema,
        });

        mpns.add(schema.mpn);
      }
    }

    return Array.from(mpns);
  }

  private updatePrices(bom: Map<string, Part>) {
    for (const item of this.bom.items) {
      if (!bom.has(item.mpn)) {
        continue;
      }

      const part = bom.get(item.mpn);
      item.url = part.url;

      // Find offer with minimum order quantity of one item and price for this "batch".
      const bestOffer = part.offers.find(
        (offer) => offer.moq === 1 && offer.prices.has(1)
      );
      if (bestOffer) {
        item.price = bestOffer.prices.get(1);
        this.bom.totalPrice += item.price * item.count;
      }
    }
  }
}
