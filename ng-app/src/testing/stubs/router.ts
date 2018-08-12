import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RouterStub {
  private subject = new BehaviorSubject(null);

  navigate() {
    return this.subject.asObservable();
  }
}
