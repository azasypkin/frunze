import {ProjectCapability} from './project-capability';
import {ProjectTypedEntity} from './project-typed-entity';

/**
 * Class that describes the specific project platform.
 */
export class ProjectPlatform extends ProjectTypedEntity {
  constructor(_type: string, _name: string, _description: string, private _capabilities: ProjectCapability[]) {
    super(_type, _name, _description);
  }

  /**
   * Project platform capabilities.
   * @returns {ProjectCapability[]}
   */
  get capabilities() {
    return this._capabilities;
  }
}
