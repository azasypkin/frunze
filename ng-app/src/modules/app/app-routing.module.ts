import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {EditorComponent} from './components/editor/editor.component';

export const routes: Routes = [
  {path: '', redirectTo: 'app', pathMatch: 'full'},
  {path: 'app', component: EditorComponent},
  {path: 'promo', loadChildren: 'modules/promo/promo.module#PromoModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
