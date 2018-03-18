import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjectsViewComponent } from './components/projects-view/projects-view.component';
import { ProjectMetadataViewComponent } from './components/project-metadata-view/project-metadata-view.component';
import { UpdatesViewComponent } from './components/updates-view/updates-view.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'promo', redirectTo: 'promo/projects', pathMatch: 'full' },
      { path: 'promo/projects', component: ProjectsViewComponent },
      {
        path: 'promo/project/metadata/new',
        component: ProjectMetadataViewComponent,
      },
      {
        path: 'promo/project/metadata/:id',
        component: ProjectMetadataViewComponent,
      },
      { path: 'promo/updates', component: UpdatesViewComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class PromoRoutingModule {}
