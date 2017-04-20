import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {ProjectsViewComponent} from './components/projects-view/projects-view.component';
import {ProjectEditViewComponent} from './components/project-edit-view/project-edit-view.component';
import {UpdatesViewComponent} from './components/updates-view/updates-view.component';


import {PromoRoutingModule} from './promo-routing.module';

@NgModule({
  declarations: [
    ProjectsViewComponent,
    ProjectEditViewComponent,
    UpdatesViewComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, PromoRoutingModule]
})
export class PromoModule {
}
