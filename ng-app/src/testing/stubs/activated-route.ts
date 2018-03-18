import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ActivatedRouteStub {
  private parameters: {};
  private subject = new BehaviorSubject(this.parameters);

  params = this.subject.asObservable();

  setParameters(parameters: {}) {
    this.parameters = parameters;
    this.subject.next(parameters);
  }
}
