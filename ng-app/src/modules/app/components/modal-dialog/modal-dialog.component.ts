import {Component} from '@angular/core';

import {ModalDialogService, IDialog} from '../../services/modal-dialog.service';

@Component({
  selector: 'frunze-modal-dialog',
  templateUrl: 'modal-dialog.component.html',
  styleUrls: ['modal-dialog.component.css']
})
export class ModalDialogComponent {
  public dialogContent: any;

  constructor(private dialogService: ModalDialogService) {
    this.dialogService.events$.subscribe((dialog: IDialog) => {
      this.dialogContent = dialog && dialog.componentType;
    });
  }

  hide() {
    this.dialogService.hide();
  }
}
