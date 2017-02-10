import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ControlsService } from './services/controls.service';

import { AppComponent } from './components/app/app.component';
import {
  ExpandableGroupsComponent
} from './components/expandable-groups/expandable-groups.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { PropertiesComponent } from './components/properties/properties.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpandableGroupsComponent,
    PropertiesComponent,
    WorkspaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ControlsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
