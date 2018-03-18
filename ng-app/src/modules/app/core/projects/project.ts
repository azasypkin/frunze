import { ProjectCapability } from './project-capability';
import { ProjectComponent } from './project-component';
import { ProjectPlatform } from './project-platform';

/**
 * Class that describes the specific project.
 */
export class Project {
  /**
   * Identifier of the project.
   * @type {string}
   */
  readonly id: string;

  /**
   * Name of the project.
   * @type {string}
   */
  readonly name: string;

  /**
   * Description of the project.
   * @type {string}
   */
  readonly description: string;

  /**
   * List of the project capabilities (from the list of supported capabilities).
   * @type {ProjectCapability[]}
   */
  readonly capabilities: ProjectCapability[];

  /**
   * Project platform (from the list of supported platforms).
   * @type {ProjectPlatform}
   */
  readonly platform: ProjectPlatform;

  /**
   * Project components.
   * @type {ProjectComponent[]}
   */
  readonly components: ProjectComponent[];

  constructor(
    id: string,
    name: string,
    description: string,
    capabilities: ProjectCapability[],
    platform: ProjectPlatform,
    components: ProjectComponent[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.capabilities = capabilities;
    this.platform = platform;
    this.components = components;
  }

  /**
   * Produces simplified JSON version of the project.
   * @returns {{id: string, name: string, description: string, platform: string, capabilities: string[],
   *            components: Object[]}}
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      platform: this.platform.type,
      capabilities: this.capabilities.map((capability) => capability.type),
      components: this.components.map((component) => component.toJSON()),
    };
  }
}
