import {CommonModule}        from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ProjectsViewComponent} from './components/projects-view/projects-view.component';

import {PromoRoutingModule}   from './promo-routing.module';

@NgModule({
  declarations: [
    ProjectsViewComponent
  ],
  imports: [CommonModule, FormsModule, PromoRoutingModule]
})
export class PromoModule {
}
