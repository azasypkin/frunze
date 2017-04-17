import {CommonModule}        from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ProjectsViewComponent} from './components/projects-view/projects-view.component';
import {ProjectEditViewComponent} from './components/project-edit-view/project-edit-view.component';

import {PromoRoutingModule}   from './promo-routing.module';

@NgModule({
  declarations: [
    ProjectsViewComponent,
    ProjectEditViewComponent
  ],
  imports: [CommonModule, FormsModule, PromoRoutingModule]
})
export class PromoModule {
}
