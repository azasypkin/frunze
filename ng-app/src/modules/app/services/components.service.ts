import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Config } from '../config';

import { TypedEntity } from '../core/typed-entity';
import { ComponentGroup } from '../core/components/component-group';
import { ComponentSchema } from '../core/components/component-schema';
import {
  PropertySchema,
  PredefinedPropertySchema,
  ComponentPropertySchema,
} from '../core/components/component-property-schema';
import { ComponentActionSchema } from '../core/components/component-action-schema';
import { ComponentTriggerSchema } from '../core/components/component-trigger-schema';

const APIPaths = Object.freeze({
  groups: 'component-groups',
  schemas: 'component-schemas',
});

interface RawPredefinedPropertyKind {
  predefined: TypedEntity[];
}

interface RawComponentPropertyKind {
  component: string[];
}

type PropertyKind =
  | 'custom'
  | RawPredefinedPropertyKind
  | RawComponentPropertyKind;

function isPredefinedPropertyKind(
  propertyKind: PropertyKind
): propertyKind is RawPredefinedPropertyKind {
  return (<RawPredefinedPropertyKind>propertyKind).predefined !== undefined;
}

function isComponentPropertyKind(
  propertyKind: PropertyKind
): propertyKind is RawComponentPropertyKind {
  return (<RawComponentPropertyKind>propertyKind).component !== undefined;
}

interface RawPropertySchema {
  type: string;
  name: string;
  description: string;
  defaultValue: string;
  kind: PropertyKind;
}

@Injectable()
export class ComponentsService {
  private schemas: Observable<Map<string, ComponentSchema>> = null;

  private static handleError(error: HttpErrorResponse) {
    const errorMessage: string =
      error.error instanceof Error ? error.error.message : error.message;

    console.log(error);
    return throwError(errorMessage);
  }

  /**
   * Converts raw component property schema json to a ComponentPropertySchema instance.
   * @param {Object} rawPropertySchema Raw component property schema JSON returned from the API.
   * @returns {PropertySchema}
   * @private
   */
  private static constructPropertySchema(
    rawPropertySchema: RawPropertySchema
  ): PropertySchema {
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
      rawComponentSchema.mpn || '',
      new Map(
        Object.keys(rawComponentSchema.properties).map((key) => {
          return [
            key,
            ComponentsService.constructPropertySchema(
              rawComponentSchema.properties[key]
            ),
          ] as [string, PropertySchema];
        })
      ),
      new Map(
        Object.keys(rawComponentSchema.actions).map((key) => {
          return [
            key,
            ComponentsService.constructActionSchema(
              rawComponentSchema.actions[key]
            ),
          ] as [string, ComponentActionSchema];
        })
      ),
      new Map(
        Object.keys(rawComponentSchema.triggers).map((key) => {
          return [
            key,
            ComponentsService.constructTriggerSchema(
              rawComponentSchema.triggers[key]
            ),
          ] as [string, ComponentTriggerSchema];
        })
      )
    );
  }

  private static constructGroup(
    schemas: Map<string, ComponentSchema>,
    rawGroup: any
  ) {
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
  private static constructCollection<T>(
    response: any,
    constructor: (rawItem: any) => T
  ): T[] {
    if (!response) {
      return [];
    }

    return response.map((rawItem) => constructor(rawItem));
  }

  constructor(private config: Config, private http: HttpClient) {}

  getGroups() {
    return forkJoin(
      this.getSchemas(),
      this.http.get(`${this.config.apiDomain}/${APIPaths.groups}`)
    ).pipe(
      map(([schemas, response]) => {
        return ComponentsService.constructCollection(
          response,
          (rawComponentGroup) =>
            ComponentsService.constructGroup(schemas, rawComponentGroup)
        );
      }),
      catchError(ComponentsService.handleError)
    );
  }

  getSchemas() {
    if (this.schemas) {
      return this.schemas;
    }

    return (this.schemas = this.http
      .get(`${this.config.apiDomain}/${APIPaths.schemas}`)
      .pipe(
        map((response) => {
          const schemas = new Map(
            ComponentsService.constructCollection(
              response,
              ComponentsService.constructComponentSchema
            ).map(
              (schema) => [schema.type, schema] as [string, ComponentSchema]
            )
          );

          this.schemas = of(schemas);

          return schemas;
        }),
        catchError(ComponentsService.handleError)
      ));
  }
}
