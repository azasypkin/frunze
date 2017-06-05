import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {Config} from '../config';

import {ComponentGroup} from '../core/components/component-group';
import {ComponentMetadata} from '../core/components/component-metadata';

@Injectable()
export class ComponentsService {
  private componentGroupsAPIPath = 'component-groups';

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

  constructor(private config: Config, private http: Http) {
  }

  getGroups(): Observable<ComponentGroup[]> {
    return this.http.get(`${this.config.apiDomain}/${this.componentGroupsAPIPath}`)
      .map(this.jsonToGroups)
      .catch(ComponentsService.handleError);
  }

  private jsonToGroups(response: Response) {
    const rawGroups = response.json();

    if (!rawGroups) {
      return [];
    }

    return rawGroups.map((rawGroup) => {
      return new ComponentGroup(rawGroup.type, rawGroup.name, rawGroup.description, rawGroup.items.map((item) => {
        return new ComponentMetadata(item.type, item.name, item.description);
      }));
    });
  }
}
