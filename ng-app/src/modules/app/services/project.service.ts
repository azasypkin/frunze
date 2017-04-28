import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import {Config} from '../config';

import {ProjectCapabilityGroup} from '../core/projects/project-capability-group';
import {ProjectCapability} from '../core/projects/project-capability';
import {ProjectPlatform} from '../core/projects/project-platform';

const APIPaths = Object.freeze({
  projectCapabilities: 'project-capabilities',
  projectCapabilityGroups: 'project-capability-groups',
  projectPlatforms: 'project-platforms'
});

@Injectable()
export class ProjectService {
  private capabilities: Observable<ProjectCapability[]> = null;
  private capabilityGroups: Observable<ProjectCapabilityGroup[]> = null;
  private platforms: Observable<ProjectPlatform[]> = null;

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
   * Returns an array of project capabilities (either from inline cache or from server).
   * @returns {Observable.<ProjectCapability[]>}
   */
  getCapabilities(): Observable<ProjectCapability[]> {
    if (this.capabilities) {
      return this.capabilities;
    }

    return this.capabilities = this.http.get(`${this.config.apiDomain}/${APIPaths.projectCapabilities}`)
        .map((response: Response) => {
          const capabilities = this.constructCapabilities(response);

          // Copy an array to avoid side modifications.
          this.capabilities = Observable.of(capabilities).map((c) => [...c]);

          return capabilities;
        })
        .catch(ProjectService.handleError);
  }

  /**
   * Returns an array of project capability groups (either from inline cache or from server).
   * @returns {Observable.<ProjectCapabilityGroup[]>}
   */
  getCapabilityGroups(): Observable<ProjectCapabilityGroup[]> {
    if (this.capabilityGroups) {
      return this.capabilityGroups;
    }

    return this.capabilityGroups = Observable.forkJoin(
        this.getCapabilities(),
        this.http.get(`${this.config.apiDomain}/${APIPaths.projectCapabilityGroups}`)
    ).map(([capabilities, response]) => {
      const capabilityGroups = this.constructCapabilityGroups(capabilities, response);

      // Copy an array to avoid side modifications.
      this.capabilityGroups = Observable.of(capabilityGroups).map((c) => [...c]);

      return capabilityGroups;
    })
    .catch(ProjectService.handleError);
  }

  /**
   * Returns an array of project platforms (either from inline cache or from server).
   * @returns {Observable.<ProjectPlatform[]>}
   */
  getPlatforms(): Observable<ProjectPlatform[]> {
    if (this.platforms) {
      return this.platforms;
    }

    return this.platforms = Observable.forkJoin(
        this.getCapabilities(),
        this.http.get(`${this.config.apiDomain}/${APIPaths.projectPlatforms}`)
    ).map(([capabilities, response]) => {
      const platforms = this.constructPlatforms(capabilities, response);

      // Copy an array to avoid side modifications.
      this.platforms = Observable.of(platforms).map((c) => [...c]);

      return platforms;
    })
    .catch(ProjectService.handleError);
  }

  /**
   * Converts raw project capability json to an array of ProjectCapability instances.
   * @param {Response} response Raw response returned from the API.
   * @returns {ProjectCapability[]}
   * @private
   */
  private constructCapabilities(response: Response) {
    const jsonResponse = response.json();
    if (!jsonResponse) {
      return [];
    }

    return jsonResponse.map((rawData) => new ProjectCapability(rawData.type, rawData.name, rawData.description));
  }

  /**
   * Converts raw project capability group json to an array of ProjectCapabilityGroup instances.
   * @param {ProjectCapability[]} capabilities List of already loaded ProjectCapability instances.
   * @param {Response} response Raw response returned from the API.
   * @returns {ProjectCapabilityGroup[]}
   * @private
   */
  private constructCapabilityGroups(capabilities: ProjectCapability[], response: Response) {
    const jsonResponse = response.json();
    if (!jsonResponse) {
      return [];
    }

    return jsonResponse.map((rawData) => {
      return new ProjectCapabilityGroup(rawData.type, rawData.name, rawData.description,
          // FIXME: "find" is very ineffective in this case, here we should use Map.
          rawData.capabilities.map(
              (capabilityType) => capabilities.find((capability) => capability.type === capabilityType)
          )
      );
    });
  }

  /**
   * Converts raw project platform json to an array of ProjectPlatform instances.
   * @param {ProjectCapability[]} capabilities List of already loaded ProjectCapability instances.
   * @param {Response} response Raw response returned from the API.
   * @returns {ProjectPlatform[]}
   * @private
   */
  private constructPlatforms(capabilities: ProjectCapability[], response: Response) {
    const jsonResponse = response.json();
    if (!jsonResponse) {
      return [];
    }

    return jsonResponse.map((rawData) => {
      return new ProjectPlatform(rawData.type, rawData.name, rawData.description,
          // FIXME: "find" is very ineffective in this case, here we should use Map.
          rawData.capabilities.map(
              (capabilityType) => capabilities.find((capability) => capability.type === capabilityType)
          )
      );
    });
  }
}
