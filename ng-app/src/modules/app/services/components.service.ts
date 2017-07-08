import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import {Config} from '../config';

import {ComponentGroup} from '../core/components/component-group';
import {ComponentSchema} from '../core/components/component-schema';
import {ComponentPropertySchema} from '../core/components/component-property-schema';

const APIPaths = Object.freeze({
  groups: 'component-groups',
  schemas: 'component-schemas'
});

@Injectable()
export class ComponentsService {
  private schemas: Observable<Map<string, ComponentSchema>> = null;

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

  /**
   * Converts raw component property schema json to a ComponentPropertySchema instance.
   * @param {Object} rawPropertySchema Raw component property schema JSON returned from the API.
   * @returns {ComponentPropertySchema}
   * @private
   */
  private static constructPropertySchema(rawPropertySchema: any) {
    return new ComponentPropertySchema(
      rawPropertySchema.type,
      rawPropertySchema.name,
      rawPropertySchema.description,
      rawPropertySchema.defaultValue
    );
  }

  /**
   * Converts raw project component schema json to a ComponentSchema instance.
   * @param {Object} rawComponentSchema Raw component schema JSON returned from the API.
   * @returns {ComponentSchema}
   * @private
   */
  private static constructComponentSchema(rawComponentSchema: any) {
    return new ComponentSchema(
      rawComponentSchema.type,
      rawComponentSchema.name,
      rawComponentSchema.description,
      new Map(
        Object.keys(rawComponentSchema.properties).map((key) => {
          return [
            key,
            ComponentsService.constructPropertySchema(rawComponentSchema.properties[key])
          ] as [string, ComponentPropertySchema]
        })
      )
    );
  }

  private static constructGroup(schemas: Map<string, ComponentSchema>, rawGroup: any) {
    return new ComponentGroup(
      rawGroup.type,
      rawGroup.name,
      rawGroup.description,
      rawGroup.items.map((itemType) => schemas.get(itemType))
    );
  }

  /**
   * Constructs collection of objects from JSON HTTP response using generic constructor function.
   * @param response {Response} HTTP Response object returned from the API.
   * @param constructor {Function(rawItem: Object) -> T} Function that can construct object from raw JSON.
   * @returns {Array.<T>}
   * @private
   */
  private static constructCollection<T>(response: Response, constructor: (rawItem: any) => T): T[] {
    const jsonRawValue = response.json();
    if (!jsonRawValue) {
      return [];
    }

    return jsonRawValue.map((rawItem) => constructor(rawItem));
  }

  constructor(private config: Config, private http: Http) {
  }

  getGroups(): Observable<ComponentGroup[]> {
    return Observable.forkJoin(
      this.getSchemas(),
      this.http.get(`${this.config.apiDomain}/${APIPaths.groups}`)
    ).map(([schemas, response]) => {
      return ComponentsService.constructCollection(
        response,
        (rawComponentGroup) => ComponentsService.constructGroup(schemas, rawComponentGroup)
      );
    })
    .catch(ComponentsService.handleError);
  }

  getSchemas(): Observable<Map<string, ComponentSchema>> {
    if (this.schemas) {
      return this.schemas;
    }

    return this.schemas = this.http.get(`${this.config.apiDomain}/${APIPaths.schemas}`)
      .map((response: Response) => {
        const schemas = new Map(
          ComponentsService.constructCollection(response, ComponentsService.constructComponentSchema).map(
            (schema) => [schema.type, schema] as [string, ComponentSchema]
          )
        );

        this.schemas = Observable.of(schemas);

        return schemas;
      })
      .catch(ComponentsService.handleError);
  }
}
