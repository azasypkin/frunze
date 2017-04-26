import {ProjectTypedEntity} from './project-typed-entity';
import {ProjectCapability} from './project-capability';

/**
 * Class that describes high level project capability group.
 */
export class ProjectCapabilityGroup extends ProjectTypedEntity {
  constructor(_type: string, _name: string, _hint: string, private _capabilities: ProjectCapability[]) {
    super(_type, _name, _hint);
  }

  /**
   * Project group capabilities.
   * @returns {ProjectCapability[]}
   */
  get capabilities() {
    return this._capabilities;
  }
}
