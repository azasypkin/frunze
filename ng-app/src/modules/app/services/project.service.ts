import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {Config} from '../config';

import {ProjectCapabilityGroup} from '../core/projects/project-capability-group';
import {ProjectCapability} from '../core/projects/project-capability';

const APIPaths = Object.freeze({
  projectCapabilities: 'project-capabilities'
});

@Injectable()
export class ProjectService {
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

  getCapabilities(): Observable<ProjectCapabilityGroup[]> {
    return this.http.get(`${this.config.apiDomain}/${APIPaths.projectCapabilities}`)
      .map(this.jsonToGroups)
      .catch(ProjectService.handleError);
  }

  private jsonToGroups(response: Response) {
    const rawGroups = response.json();

    if (!rawGroups) {
      return [];
    }

    return rawGroups.map((rawGroup) => {
      return new ProjectCapabilityGroup(rawGroup.type, rawGroup.name, rawGroup.description,
        rawGroup.capabilities.map((item) => new ProjectCapability(item.type, item.name, item.description))
      );
    });
  }
}
