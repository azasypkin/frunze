import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BomCalculationViewComponent} from './components/bom-calculation-view/bom-calculation-view.component';
import {SchematicViewComponent} from './components/schematic-view/schematic-view.component';
import {SoftwareEditorViewComponent} from './components/software-editor-view/software-editor-view.component';

export const routes: Routes = [
  {path: '', redirectTo: 'promo/projects', pathMatch: 'full'},
  {path: 'app', component: SoftwareEditorViewComponent},
  {path: 'promo/project/software/:id', component: SoftwareEditorViewComponent},
  {path: 'promo/project/bom/:id', component: BomCalculationViewComponent},
  {path: 'promo/project/schematic/:id', component: SchematicViewComponent},
  {path: 'promo', loadChildren: 'modules/promo/promo.module#PromoModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
