/**
 * Class that describes action that should be performed once specific
 * component trigger is activated.
 */
export class ProjectComponentTriggerAction {
  /**
   * Identifier of the project component whose action should be executed.
   * @type {string}
   */
  readonly component: string;

  /**
   * Type of the project component action to execute.
   * @type {string}
   */
  readonly action: string;

  constructor(component: string, action: string) {
    this.component = component;
    this.action = action;
  }

  /**
   * Produces simplified JSON version of the component trigger action.
   * @returns {{component: string, action: string}}
   */
  toJSON() {
    return {
      component: this.component,
      action: this.action
    };
  }
}
