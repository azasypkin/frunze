import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, forkJoin, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Config } from '../config';

import { Project } from '../core/projects/project';
import { ProjectCapabilityGroup } from '../core/projects/project-capability-group';
import { ProjectCapability } from '../core/projects/project-capability';
import { ProjectPlatform } from '../core/projects/project-platform';
import { ProjectComponentTriggerAction } from '../core/projects/project-component-trigger-action';
import { ProjectComponent } from '../core/projects/project-component';

const APIPaths = Object.freeze({
  project: 'project',
  projects: 'projects',
  projectCapabilities: 'project-capabilities',
  projectCapabilityGroups: 'project-capability-groups',
  projectPlatforms: 'project-platforms',
});

@Injectable()
export class ProjectService {
  private capabilities: Observable<ProjectCapability[]> = null;
  private capabilityGroups: Observable<ProjectCapabilityGroup[]> = null;
  private platforms: Observable<ProjectPlatform[]> = null;

  private static handleError(error: HttpErrorResponse) {
    const errorMessage: string =
      error.error instanceof Error ? error.error.message : error.message;

    console.log(error);
    return throwError(errorMessage);
  }

  constructor(private config: Config, private http: HttpClient) {}

  /**
   * Returns project by its unique identifier.
   * @param {string} id Unique identifier of the project to load from the server.
   * @returns {Observable.<Project>}
   */
  getProject(id: string) {
    return forkJoin(
      this.getCapabilities(),
      this.getPlatforms(),
      this.http.get(`${this.config.apiDomain}/${APIPaths.project}/${id}`)
    ).pipe(
      map(([capabilities, platforms, response]) => {
        if (!response) {
          return null;
        }

        return this.constructProject(capabilities, platforms, response);
      }),
      catchError(ProjectService.handleError)
    );
  }

  /**
   * Saves project to the database.
   * @param {Project} project Project to save.
   * @returns {Observable<Project>} Project that has been saved.
   */
  saveProject(project: Project) {
    return this.http
      .post(`${this.config.apiDomain}/${APIPaths.project}`, project.toJSON(), {
        responseType: 'text',
      })
      .pipe(
        map((response) => {
          return new Project(
            response,
            project.name,
            project.description,
            project.capabilities,
            project.platform,
            project.components
          );
        }),
        catchError(ProjectService.handleError)
      );
  }

  /**
   * Delete project by its unique identifier.
   * @param {string} id Unique identifier of the project to delete.
   * @returns {Observable}
   */
  deleteProject(id: string) {
    return this.http
      .delete(`${this.config.apiDomain}/${APIPaths.project}/${id}`)
      .pipe(catchError(ProjectService.handleError));
  }

  /**
   * Returns an array of projects saved on the back-end.
   * @returns {Observable.<Project[]>}
   */
  getProjects() {
    return forkJoin(
      this.getCapabilities(),
      this.getPlatforms(),
      this.http.get(`${this.config.apiDomain}/${APIPaths.projects}`)
    ).pipe(
      map(([capabilities, platforms, response]) => {
        return this.constructCollection(response, (rawProject) =>
          this.constructProject(capabilities, platforms, rawProject)
        );
      }),
      catchError(ProjectService.handleError)
    );
  }

  /**
   * Returns an array of project capabilities (either from inline cache or from server).
   * @returns {Observable.<ProjectCapability[]>}
   */
  getCapabilities() {
    if (this.capabilities) {
      return this.capabilities;
    }

    return (this.capabilities = this.http
      .get(`${this.config.apiDomain}/${APIPaths.projectCapabilities}`)
      .pipe(
        map((response) => {
          const capabilities = this.constructCollection<ProjectCapability>(
            response,
            this.constructCapability.bind(this)
          );

          // Copy an array to avoid side modifications.
          this.capabilities = of(capabilities).pipe(map((c) => [...c]));

          return capabilities;
        }),
        catchError(ProjectService.handleError)
      ));
  }

  /**
   * Returns an array of project capability groups (either from inline cache or from server).
   * @returns {Observable.<ProjectCapabilityGroup[]>}
   */
  getCapabilityGroups() {
    if (this.capabilityGroups) {
      return this.capabilityGroups;
    }

    return (this.capabilityGroups = forkJoin(
      this.getCapabilities(),
      this.http.get(
        `${this.config.apiDomain}/${APIPaths.projectCapabilityGroups}`
      )
    ).pipe(
      map(([capabilities, response]) => {
        const capabilityGroups = this.constructCollection(
          response,
          (rawCapabilityGroup) =>
            this.constructCapabilityGroup(capabilities, rawCapabilityGroup)
        );

        // Copy an array to avoid side modifications.
        this.capabilityGroups = of(capabilityGroups).pipe(map((c) => [...c]));

        return capabilityGroups;
      }),
      catchError(ProjectService.handleError)
    ));
  }

  /**
   * Returns an array of project platforms (either from inline cache or from server).
   * @returns {Observable.<ProjectPlatform[]>}
   */
  getPlatforms() {
    if (this.platforms) {
      return this.platforms;
    }

    return (this.platforms = forkJoin(
      this.getCapabilities(),
      this.http.get(`${this.config.apiDomain}/${APIPaths.projectPlatforms}`)
    ).pipe(
      map(([capabilities, response]) => {
        const platforms = this.constructCollection(response, (rawPlatform) =>
          this.constructPlatform(capabilities, rawPlatform)
        );

        // Copy an array to avoid side modifications.
        this.platforms = of(platforms).pipe(map((c) => [...c]));

        return platforms;
      }),
      catchError(ProjectService.handleError)
    ));
  }

  /**
   * Converts raw project json to a Project instance.
   * @param {ProjectCapability[]} capabilities List of already loaded ProjectCapability instances.
   * @param {ProjectPlatform[]} platforms List of already loaded ProjectPlatform instances.
   * @param {Object} rawProject Raw project JSON returned from the API.
   * @returns {Project}
   * @private
   */
  private constructProject(
    capabilities: ProjectCapability[],
    platforms: ProjectPlatform[],
    rawProject: any
  ) {
    return new Project(
      rawProject.id,
      rawProject.name,
      rawProject.description,
      // FIXME: "find" is very ineffective in this case, here we should use Map.
      // Should be fixed in https://github.com/azasypkin/frunze/issues/2.
      rawProject.capabilities.map((capabilityType) =>
        capabilities.find((capability) => capability.type === capabilityType)
      ),
      platforms.find((platform) => platform.type === rawProject.platform),
      rawProject.components.map((component) => {
        return new ProjectComponent(
          component.id,
          component.type,
          new Map(
            Object.keys(component.properties).map(
              (key) => [key, component.properties[key]] as [string, string]
            )
          ),
          new Map(
            Object.keys(component.triggers).map((key) => {
              const triggerActions = component.triggers[key].map(
                (rawTriggerAction) =>
                  this.constructComponentTriggerAction(rawTriggerAction)
              );
              return [key, triggerActions] as [
                string,
                ProjectComponentTriggerAction[]
              ];
            })
          )
        );
      })
    );
  }

  /**
   * Converts raw project capability json to a ProjectCapability instance.
   * @param {Object} rawCapability Raw capability JSON returned from the API.
   * @returns {ProjectCapability}
   * @private
   */
  private constructCapability(rawCapability: any) {
    return new ProjectCapability(
      rawCapability.type,
      rawCapability.name,
      rawCapability.description
    );
  }

  /**
   * Converts raw project trigger action json to a ProjectComponentTriggerAction instance.
   * @param {Object} rawTriggerAction Raw component trigger action JSON returned from the API.
   * @returns {ProjectComponentTriggerAction}
   * @private
   */
  private constructComponentTriggerAction(rawTriggerAction: any) {
    return new ProjectComponentTriggerAction(
      rawTriggerAction.component,
      rawTriggerAction.action
    );
  }

  /**
   * Converts raw project capability group json to a ProjectCapabilityGroup instance.
   * @param {ProjectCapability[]} capabilities List of already loaded ProjectCapability instances.
   * @param {Object} rawCapabilityGroup Raw ProjectCapabilityGroup JSON returned from the API.
   * @returns {ProjectCapabilityGroup}
   * @private
   */
  private constructCapabilityGroup(
    capabilities: ProjectCapability[],
    rawCapabilityGroup: any
  ) {
    return new ProjectCapabilityGroup(
      rawCapabilityGroup.type,
      rawCapabilityGroup.name,
      rawCapabilityGroup.description,
      // FIXME: "find" is very ineffective in this case, here we should use Map.
      rawCapabilityGroup.capabilities.map((capabilityType) =>
        capabilities.find((capability) => capability.type === capabilityType)
      )
    );
  }

  /**
   * Converts raw project platform json to a ProjectPlatform instance.
   * @param {ProjectCapability[]} capabilities List of already loaded ProjectCapability instances.
   * @param {Object} rawPlatform Raw platform JSON returned from the API.
   * @returns {ProjectPlatform}
   * @private
   */
  private constructPlatform(
    capabilities: ProjectCapability[],
    rawPlatform: any
  ) {
    return new ProjectPlatform(
      rawPlatform.type,
      rawPlatform.name,
      rawPlatform.description,
      // FIXME: "find" is very ineffective in this case, here we should use Map.
      rawPlatform.capabilities.map((capabilityType) =>
        capabilities.find((capability) => capability.type === capabilityType)
      )
    );
  }

  /**
   * Constructs collection of objects from JSON HTTP response using generic constructor function.
   * @param response {Response} HTTP Response object returned from the API.
   * @param constructor {Function(rawItem: Object) -> T} Function that can construct object from raw JSON.
   * @returns {Array.<T>}
   * @private
   */
  private constructCollection<T>(
    response,
    constructor: (rawItem: any) => T
  ): T[] {
    if (!response) {
      return [];
    }

    return response.map((rawItem) => constructor(rawItem));
  }
}
