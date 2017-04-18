/**
 * Enum that describes all possible project high level kinds.
 */
export enum ProjectKind {
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
   * Kind of the project.
   */
  kind: ProjectKind;

  constructor(name: string = 'New Project', kind: ProjectKind = ProjectKind.Custom) {
    this.name = name;
    this.kind = kind;
  }
}