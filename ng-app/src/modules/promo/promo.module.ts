import {CommonModule}        from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IndexComponent} from './components/index/index.component';

import {PromoRoutingModule}   from './promo-routing.module';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [CommonModule, FormsModule, PromoRoutingModule]
})
export class PromoModule {
}
