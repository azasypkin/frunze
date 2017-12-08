import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Config} from '../config';

const APIPaths = Object.freeze({
  schematic: 'schematic'
});

@Injectable()
export class SchematicService {
  private static handleError(error: HttpErrorResponse) {
    const errorMessage: string = error.error instanceof Error
      ? error.error.message
      : error.message;

    console.log(error);
    return Observable.throw(errorMessage);
  }

  constructor(private config: Config, private http: HttpClient) {
  }

  /**
   * Returns schematic for the project with specified identifier.
   * @param {string} projectId Unique identifier of the project to load schematic for.
   * @returns {Observable.<Blob>}
   */
  getProjectSchematic(projectId: string): Observable<Blob> {
    return this.http
      .get(`${this.config.apiDomain}/${APIPaths.schematic}/${projectId}`, {responseType: 'text'})
      .map((response) => {
        if (!response) {
          return null;
        }

        return new Blob([response], {type: 'image/svg+xml'});
      })
    .catch(SchematicService.handleError);
  }
}
