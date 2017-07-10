import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {Config} from './config';

import {ComponentsService} from './services/components.service';
import {ModalDialogService} from './services/modal-dialog.service';
import {ProjectService} from './services/project.service';

import {BootstrapComponent} from './components/bootstrap/bootstrap.component';
import {ModalDialogComponent} from './components/modal-dialog/modal-dialog.component';
import {SoftwareEditorViewComponent} from './components/software-editor-view/software-editor-view.component';
import {ExpandableGroupsComponent} from './components/expandable-groups/expandable-groups.component';
import {PropertyEditorComponent} from './components/property-editor/property-editor.component'
import {TriggerEditorComponent} from './components/trigger-editor/trigger-editor.component'

import {PromoModule} from '../promo/promo.module';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    BootstrapComponent,
    ModalDialogComponent,
    SoftwareEditorViewComponent,
    ExpandableGroupsComponent,
    PropertyEditorComponent,
    TriggerEditorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    PromoModule,
    AppRoutingModule
  ],
  providers: [Config, ComponentsService, ModalDialogService, ProjectService],
  bootstrap: [BootstrapComponent]
})
export class AppModule {
}
