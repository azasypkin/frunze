import {NgModule}             from '@angular/core';
import {RouterModule} from '@angular/router';

import {ProjectsViewComponent} from './components/projects-view/projects-view.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: 'promo', redirectTo: 'promo/projects', pathMatch: 'full'},
    {path: 'promo/projects', component: ProjectsViewComponent}
  ])],
  exports: [RouterModule]
})
export class PromoRoutingModule {
}