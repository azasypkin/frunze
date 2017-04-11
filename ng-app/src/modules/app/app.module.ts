import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {Config} from './config';

import {ControlsService} from './services/controls.service';

import {BootstrapComponent} from './components/bootstrap/bootstrap.component';
import {ExpandableGroupsComponent} from './components/expandable-groups/expandable-groups.component';
import {WorkspaceComponent} from './components/workspace/workspace.component';
import {PropertiesComponent} from './components/properties/properties.component';

@NgModule({
  declarations: [
    BootstrapComponent,
    ExpandableGroupsComponent,
    PropertiesComponent,
    WorkspaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [Config, ControlsService],
  bootstrap: [BootstrapComponent]
})
export class AppModule {
}
