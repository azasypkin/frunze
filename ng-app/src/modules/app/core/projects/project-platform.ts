import {ProjectCapability} from './project-capability';
import {TypedEntity} from '../typed-entity';

/**
 * Class that describes the specific project platform.
 */
export class ProjectPlatform extends TypedEntity {
  /**
   * Project platform capabilities.
   * @type {ProjectCapability[]}
   */
  readonly capabilities: ProjectCapability[];

  constructor(type: string, name: string, description: string, capabilities: ProjectCapability[]) {
    super(type, name, description);

    this.capabilities = capabilities;
  }
}
