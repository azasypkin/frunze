import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {Config} from './config';

import {BomService} from './services/bom.service';
import {ComponentsService} from './services/components.service';
import {ModalDialogService} from './services/modal-dialog.service';
import {ProjectService} from './services/project.service';
import {SchematicService} from './services/schematic.service';

import {BootstrapComponent} from './components/bootstrap/bootstrap.component';
import {ModalDialogComponent} from './components/modal-dialog/modal-dialog.component';
import {SchematicViewComponent} from './components/schematic-view/schematic-view.component';
import {SoftwareEditorViewComponent} from './components/software-editor-view/software-editor-view.component';
import {BomCalculationViewComponent} from './components/bom-calculation-view/bom-calculation-view.component';
import {TriggersEditorDialogComponent} from './components/dialogs/triggers-editor-dialog/triggers-editor-dialog.component';
import {ExpandableGroupsComponent} from './components/expandable-groups/expandable-groups.component';
import {PropertyEditorComponent} from './components/property-editor/property-editor.component'
import {TriggerEditorComponent} from './components/trigger-editor/trigger-editor.component'

import {PromoModule} from '../promo/promo.module';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    BootstrapComponent,
    ModalDialogComponent,
    SchematicViewComponent,
    SoftwareEditorViewComponent,
    BomCalculationViewComponent,
    ExpandableGroupsComponent,
    PropertyEditorComponent,
    TriggerEditorComponent,
    TriggersEditorDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    PromoModule,
    AppRoutingModule
  ],
  providers: [
    Config,
    BomService,
    ComponentsService,
    ModalDialogService,
    ProjectService,
    SchematicService
  ],
  bootstrap: [BootstrapComponent],
  entryComponents: [TriggersEditorDialogComponent]
})
export class AppModule {
}
