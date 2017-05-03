import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {ProjectsViewComponent} from './components/projects-view/projects-view.component';
import {ProjectMetadataViewComponent} from './components/project-metadata-view/project-metadata-view.component';
import {UpdatesViewComponent} from './components/updates-view/updates-view.component';


import {PromoRoutingModule} from './promo-routing.module';

@NgModule({
  declarations: [
    ProjectsViewComponent,
    ProjectMetadataViewComponent,
    UpdatesViewComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, PromoRoutingModule]
})
export class PromoModule {
}
