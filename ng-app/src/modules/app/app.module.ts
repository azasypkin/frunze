import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {Config} from './config';

import {ControlsService} from './services/controls.service';
import {ProjectService} from './services/project.service';


import {BootstrapComponent} from './components/bootstrap/bootstrap.component';
import {EditorComponent} from './components/editor/editor.component';
import {ExpandableGroupsComponent} from './components/expandable-groups/expandable-groups.component';
import {WorkspaceComponent} from './components/workspace/workspace.component';
import {PropertiesComponent} from './components/properties/properties.component';

import {PromoModule} from '../promo/promo.module';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    BootstrapComponent,
    EditorComponent,
    ExpandableGroupsComponent,
    PropertiesComponent,
    WorkspaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PromoModule,
    AppRoutingModule
  ],
  providers: [Config, ControlsService, ProjectService],
  bootstrap: [BootstrapComponent]
})
export class AppModule {
}
