import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export interface IDialog {
  componentType: any,
  title: string,
  inputs?: any
}

@Injectable()
export class ModalDialogService {
  private dialogs: IDialog[] = [];
  private subject = new BehaviorSubject<IDialog>({ componentType: null, title: null });

  readonly events$ = this.subject.asObservable();

  /**
   * Displays dialog of specified type.
   * @param {Function} componentType Type of the component to use as dialog.
   * @param {string} title Dialog title.
   * @param {*?} inputs Optional dialog arguments.
   */
  show(componentType: any, title: string, inputs?: any) {
    this.dialogs.push({ componentType, title, inputs });

    this.onUpdate();
  }

  /**
   * Hides current displayed dialog, if current dialog was previously opened on top
   * another one then it will be shown as soon as current dialog is hidden.
   */
  hide() {
    this.dialogs.pop();

    this.onUpdate();
  }

  private onUpdate() {
    this.subject.next(
      this.dialogs.length > 0 ?
        this.dialogs[this.dialogs.length - 1] :
        null
    );
  }
}
