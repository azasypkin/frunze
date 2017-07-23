import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import {Config} from '../config';

import {TypedEntity} from '../core/typed-entity';
import {ComponentGroup} from '../core/components/component-group';
import {ComponentSchema} from '../core/components/component-schema';
import {
  PropertySchema,
  PredefinedPropertySchema,
  ComponentPropertySchema
} from '../core/components/component-property-schema';
import {ComponentActionSchema} from '../core/components/component-action-schema';
import {ComponentTriggerSchema} from '../core/components/component-trigger-schema';

const APIPaths = Object.freeze({
  groups: 'component-groups',
  schemas: 'component-schemas'
});

interface RawPredefinedPropertyKind {
  predefined: TypedEntity[]
}

interface RawComponentPropertyKind {
  component: string[]
}

type PropertyKind = 'custom' | RawPredefinedPropertyKind | RawComponentPropertyKind;

function isPredefinedPropertyKind(propertyKind: PropertyKind): propertyKind is RawPredefinedPropertyKind {
  return (<RawPredefinedPropertyKind>propertyKind).predefined !== undefined;
}

function isComponentPropertyKind(propertyKind: PropertyKind): propertyKind is RawComponentPropertyKind {
  return (<RawComponentPropertyKind>propertyKind).component !== undefined;
}

interface RawPropertySchema {
  type: string,
  name: string
  description: string,
  defaultValue: string,
  kind: PropertyKind
}

@Injectable()
export class ComponentsService {
  private schemas: Observable<Map<string, ComponentSchema>> = null;

  private static handleError(error: Response | Error) {
    let errorMessage: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      errorMessage = `${error.status} - ${error.statusText || ''} ${body.error || JSON.stringify(body)}`;
    } else if (error instanceof Error) {
      errorMessage = error.message ? error.message : error.toString();
    }

    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }

  /**
   * Converts raw component property schema json to a ComponentPropertySchema instance.
   * @param {Object} rawPropertySchema Raw component property schema JSON returned from the API.
   * @returns {PropertySchema}
   * @private
   */
  private static constructPropertySchema(rawPropertySchema: RawPropertySchema): PropertySchema {
    if (rawPropertySchema.kind === 'custom') {
      return new PropertySchema(
        rawPropertySchema.type,
        rawPropertySchema.name,
        rawPropertySchema.description,
        rawPropertySchema.defaultValue
      );
    }

    if (isPredefinedPropertyKind(rawPropertySchema.kind)) {
      return new PredefinedPropertySchema(
        rawPropertySchema.type,
        rawPropertySchema.name,
        rawPropertySchema.description,
        rawPropertySchema.defaultValue,
        (<RawPredefinedPropertyKind>rawPropertySchema.kind).predefined
      );
    }

    if (isComponentPropertyKind(rawPropertySchema.kind)) {
      return new ComponentPropertySchema(
        rawPropertySchema.type,
        rawPropertySchema.name,
        rawPropertySchema.description,
        rawPropertySchema.defaultValue,
        (<RawComponentPropertyKind>rawPropertySchema.kind).component
      );
    }

    throw new Error('Unknown property kind!');
  }

  /**
   * Converts raw component action schema json to a ComponentActionSchema instance.
   * @param {Object} rawActionSchema Raw component action schema JSON returned from the API.
   * @returns {ComponentActionSchema}
   * @private
   */
  private static constructActionSchema(rawActionSchema: any) {
    return new ComponentActionSchema(
      rawActionSchema.type,
      rawActionSchema.name,
      rawActionSchema.description
    );
  }

  /**
   * Converts raw component trigger schema json to a ComponentTriggerSchema instance.
   * @param {Object} rawTriggerSchema Raw component trigger schema JSON returned from the API.
   * @returns {ComponentTriggerSchema}
   * @private
   */
  private static constructTriggerSchema(rawTriggerSchema: any) {
    return new ComponentTriggerSchema(
      rawTriggerSchema.type,
      rawTriggerSchema.name,
      rawTriggerSchema.description
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
          ] as [string, PropertySchema]
        })
      ),
      new Map(
        Object.keys(rawComponentSchema.actions).map((key) => {
          return [
            key,
            ComponentsService.constructActionSchema(rawComponentSchema.actions[key])
          ] as [string, ComponentActionSchema]
        })
      ),
      new Map(
        Object.keys(rawComponentSchema.triggers).map((key) => {
          return [
            key,
            ComponentsService.constructTriggerSchema(rawComponentSchema.triggers[key])
          ] as [string, ComponentTriggerSchema]
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
