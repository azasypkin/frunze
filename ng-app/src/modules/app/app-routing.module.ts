import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SoftwareEditorViewComponent} from './components/software-editor-view/software-editor-view.component';

export const routes: Routes = [
  {path: '', redirectTo: 'app', pathMatch: 'full'},
  {path: 'app', component: SoftwareEditorViewComponent},
  {path: 'promo/project/software', component: SoftwareEditorViewComponent},
  {path: 'promo', loadChildren: 'modules/promo/promo.module#PromoModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
