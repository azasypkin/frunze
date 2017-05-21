import {ProjectCapability} from './project-capability';
import {TypedEntity} from '../typed-entity';

/**
 * Class that describes the specific project platform.
 */
export class ProjectPlatform extends TypedEntity {
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
