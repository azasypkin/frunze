import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Config } from '../config';

const APIPaths = Object.freeze({
  schematic: 'schematic',
});

@Injectable()
export class SchematicService {
  private static handleError(error: HttpErrorResponse) {
    const errorMessage: string =
      error.error instanceof Error ? error.error.message : error.message;

    console.log(error);
    return throwError(errorMessage);
  }

  constructor(private config: Config, private http: HttpClient) {}

  /**
   * Returns schematic for the project with specified identifier.
   * @param {string} projectId Unique identifier of the project to load schematic for.
   * @returns {Observable.<Blob>}
   */
  getProjectSchematic(projectId: string) {
    return this.http
      .get(`${this.config.apiDomain}/${APIPaths.schematic}/${projectId}`, {
        responseType: 'text',
      })
      .pipe(
        map((response) => {
          if (!response) {
            return null;
          }

          return new Blob([response], { type: 'image/svg+xml' });
        }),
        catchError(SchematicService.handleError)
      );
  }
}
