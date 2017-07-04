import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {Config} from './config';

import {ComponentsService} from './services/components.service';
import {ProjectService} from './services/project.service';

import {BootstrapComponent} from './components/bootstrap/bootstrap.component';
import {SoftwareEditorViewComponent} from './components/software-editor-view/software-editor-view.component';
import {ExpandableGroupsComponent} from './components/expandable-groups/expandable-groups.component';
import {PropertyEditorComponent} from './components/property-editor/property-editor.component'

import {PromoModule} from '../promo/promo.module';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    BootstrapComponent,
    SoftwareEditorViewComponent,
    ExpandableGroupsComponent,
    PropertyEditorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    PromoModule,
    AppRoutingModule
  ],
  providers: [Config, ComponentsService, ProjectService],
  bootstrap: [BootstrapComponent]
})
export class AppModule {
}
