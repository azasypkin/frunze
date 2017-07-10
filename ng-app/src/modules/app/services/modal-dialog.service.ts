import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export interface IDialog {
  componentType: any,
  inputs?: any
}

@Injectable()
export class ModalDialogService {
  private dialogs: IDialog[] = [];
  private subject = new BehaviorSubject<IDialog>({ componentType: null });

  readonly events$ = this.subject.asObservable();

  /**
   * Displays dialog of specified type.
   * @param {Function} componentType Type of the component to use as dialog.
   * @param {*?} inputs Optional dialog arguments.
   */
  show(componentType: any, inputs?: any) {
    const dialog: IDialog = { componentType, inputs };
    this.dialogs.push(dialog);
    this.subject.next(dialog);
  }

  /**
   * Hides current displayed dialog, if current dialog was previously opened on top
   * another one then it will be shown as soon as current dialog is hidden.
   */
  hide() {
    if (this.dialogs.length > 0) {
      this.dialogs.pop();
    }

    this.subject.next(this.getCurrentDialog())
  }

  /**
   * Returns `inputs` that were supplied for currently opened dialog.
   * @returns {T}
   */
  getInputs<T>() {
    const dialog = this.getCurrentDialog();

    return dialog !== null ? <T>dialog.inputs : null;
  }

  private getCurrentDialog() {
    if (this.dialogs.length > 0) {
      return this.dialogs[this.dialogs.length - 1];
    }

    return null;
  }
}
