import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Config} from '../config';

const APIPaths = Object.freeze({
  schematic: 'schematic'
});

@Injectable()
export class SchematicService {
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

  /**
   * Returns schematic for the project with specified identifier.
   * @param {string} projectId Unique identifier of the project to load schematic for.
   * @returns {Observable.<Blob>}
   */
  getProjectSchematic(projectId: string): Observable<Blob> {
    return this.http
      .get(`${this.config.apiDomain}/${APIPaths.schematic}/${projectId}`)
      .map((response) => {
        const textResponse = response.text();
        if (!textResponse) {
          return null;
        }

        return new Blob([textResponse], {type: 'image/svg+xml'});
      })
    .catch(SchematicService.handleError);
  }
}
