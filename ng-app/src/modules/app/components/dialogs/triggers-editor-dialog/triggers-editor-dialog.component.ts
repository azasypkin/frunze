import {Component, OnInit} from '@angular/core';

import {ModalDialogService} from '../../../services/modal-dialog.service';

@Component({
  selector: 'frunze-triggers-editor-dialog',
  templateUrl: 'triggers-editor-dialog.component.html',
  styleUrls: ['triggers-editor-dialog.component.css']
})
export class TriggersEditorDialogComponent implements OnInit {
  content: string;

  constructor(private dialogService: ModalDialogService) {
  }

  ngOnInit(): void {
    this.content = this.dialogService.getInputs();
  }
}
