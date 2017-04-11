import {NgModule}             from '@angular/core';
import {RouterModule} from '@angular/router';

import {IndexComponent} from './components/index/index.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'promo', component: IndexComponent }
  ])],
  exports: [RouterModule]
})
export class PromoRoutingModule {}