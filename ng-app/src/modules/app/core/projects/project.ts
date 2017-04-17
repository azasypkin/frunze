/**
 * Enum that describes all possible project high level categories.
 */
export enum ProjectCategory {
  Indicator = 1,
  Sensor,
  Actuator,
  Custom
}

/**
 * Class that describes the specific project.
 */
export class Project {
  /**
   * Name of the project.
   */
  name: string;

  /**
   * Category of the project.
   */
  category: ProjectCategory;

  constructor(name: string = 'New Project', category: ProjectCategory = ProjectCategory.Custom) {
    this.name = name;
    this.category = category;
  }
}