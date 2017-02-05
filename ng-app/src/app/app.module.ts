import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app/app.component';
import {
  ExpandableGroups
} from './components/expandable-groups/expandable-groups.component';
import { Workspace } from './components/workspace/workspace.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpandableGroups,
    Workspace
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
