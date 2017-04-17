import {NgModule}             from '@angular/core';
import {RouterModule} from '@angular/router';

import {ProjectsViewComponent} from './components/projects-view/projects-view.component';
import {ProjectEditViewComponent} from './components/project-edit-view/project-edit-view.component';
import {UpdatesViewComponent} from './components/updates-view/updates-view.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: 'promo', redirectTo: 'promo/projects', pathMatch: 'full'},
    {path: 'promo/projects', component: ProjectsViewComponent},
    {path: 'promo/project/new', component: ProjectEditViewComponent},
    {path: 'promo/project/edit/:id', component: ProjectEditViewComponent},
    {path: 'promo/updates', component: UpdatesViewComponent}
  ])],
  exports: [RouterModule]
})
export class PromoRoutingModule {
}
