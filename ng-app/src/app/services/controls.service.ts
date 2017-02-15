import {Injectable} from '@angular/core';
import {Http, Response}          from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {Config} from '../config';

import {ControlGroup} from '../core/controls/control-group';
import {ControlMetadata} from '../core/controls/control-metadata';

@Injectable()
export class ControlsService {
  private controlGroupsAPIPath = 'control-groups';

  constructor(private config: Config, private http: Http) {
  }

  getGroups(): Observable<ControlGroup[]> {
    return this.http.get(`${this.config.apiDomain}/${this.controlGroupsAPIPath}`)
      .map(this.jsonToGroups)
      .catch(ControlsService.handleError);
  }

  private jsonToGroups(response: Response) {
    let rawGroups = response.json();

    if (!rawGroups) {
      return [];
    }

    return rawGroups.map((rawGroup) => {
      return new ControlGroup(rawGroup.type, rawGroup.name, rawGroup.description, rawGroup.items.map((item) => {
        return new ControlMetadata(item.type, item.name, item.description);
      }))
    });
  }

  private static handleError(error: Response | any) {
    let errorMessage: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      errorMessage = `${error.status} - ${error.statusText || ''} ${body.error || JSON.stringify(body)}`;
    } else {
      errorMessage = error.message ? error.message : error.toString();
    }

    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }
}
