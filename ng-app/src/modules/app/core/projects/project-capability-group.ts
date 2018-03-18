import { TypedEntity } from '../typed-entity';
import { ProjectCapability } from './project-capability';

/**
 * Class that describes high level project capability group.
 */
export class ProjectCapabilityGroup extends TypedEntity {
  /**
   * Project group capabilities.
   * @type {ProjectCapability[]}
   */
  readonly capabilities: ProjectCapability[];

  constructor(
    type: string,
    name: string,
    description: string,
    capabilities: ProjectCapability[]
  ) {
    super(type, name, description);

    this.capabilities = capabilities;
  }
}
