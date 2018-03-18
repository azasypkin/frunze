import {
  Component,
  InjectionToken,
  Injector,
  ReflectiveInjector,
} from '@angular/core';

import {
  ModalDialogService,
  IDialog,
} from '../../services/modal-dialog.service';

export const MODAL_DIALOG_PARAMETERS = new InjectionToken(
  'modal.dialog.parameters'
);

@Component({
  selector: 'frunze-modal-dialog',
  templateUrl: 'modal-dialog.component.html',
  styleUrls: ['modal-dialog.component.css'],
})
export class ModalDialogComponent {
  title: string;
  dialogContent: any;
  dialogInjector: Injector;

  constructor(
    private dialogService: ModalDialogService,
    private injector: Injector
  ) {
    this.dialogService.events$.subscribe((dialog: IDialog) => {
      if (!dialog) {
        this.dialogInjector = this.dialogContent = null;
        return;
      }

      this.title = dialog.title;

      this.dialogInjector = ReflectiveInjector.resolveAndCreate(
        [{ provide: MODAL_DIALOG_PARAMETERS, useValue: dialog.inputs }],
        injector
      );
      this.dialogContent = dialog.componentType;
    });
  }

  hide() {
    this.dialogService.hide();
  }
}
