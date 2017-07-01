import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import {ProjectService} from '../../services/project.service';
import {Project} from '../../core/projects/project';
import {ProjectComponent} from '../../core/projects/project-component';
import {ComponentGroup} from '../../core/components/component-group';
import {Guid} from '../../core/utils/guid';
import {ComponentsService} from '../../services/components.service';

@Component({
  templateUrl: 'software-editor-view.component.html',
  styleUrls: ['software-editor-view.component.css']
})
export class SoftwareEditorViewComponent implements OnInit {
  project: Project;
  componentGroups: ComponentGroup[] = [];
  dragEnterCounter = 0;
  activeComponent: ProjectComponent = null;

  constructor(private route: ActivatedRoute, private projectService: ProjectService,
              private componentsService: ComponentsService) {
  }

  ngOnInit(): void {
    this.fetchGroups();

    this.route.params
        .switchMap((params: Params) => this.projectService.getProject(params['id']))
        .subscribe((project: Project) => this.project = project, (e) => {
          console.error('Error occurred while retrieving of project.', e);
        });
  }

  /**
   * Fetches groups from the ComponentsService.
   */
  private fetchGroups() {
    this.componentsService.getGroups()
        .subscribe((groups) => this.componentGroups = groups, (e) => {
          console.error('Error occurred while retrieving of component groups.', e);
        });
  }

  /**
   * Finds component instance by its type.
   * @param {string} componentType Type of the component to find.
   * @returns {ComponentMetadata}
   * @private
   */
  private findComponentDescription(componentType) {
    for (const componentGroup of this.componentGroups) {
      for (const component of componentGroup.items) {
        if (component.type === componentType) {
          return component;
        }
      }
    }

    return null;
  }

  /**
   * Fires once anything draggable drags over the workspace.
   * @param {DragEvent} e Drag event instance.
   */
  onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  /**
   * Fires once anything draggable enters the workspace.
   * @param {DragEvent} e Drag event instance.
   */
  onDragEnter(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.dragEnterCounter++;
  }

  /**
   * Fires once anything draggable leaves the workspace.
   * @param {DragEvent} e Drag event instance.
   */
  onDragLeave(e: DragEvent) {
    e.stopPropagation();

    this.dragEnterCounter--;
  }

  /**
   * Fires once anything draggable is dropped into the workspace.
   * @param {DragEvent} e Drag event instance.
   */
  onDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.dragEnterCounter = 0;

    const componentType = e.dataTransfer.getData(e.dataTransfer.types[0]);
    const component = this.findComponentDescription(componentType);
    if (component !== null) {
      this.project.components.push(
          new ProjectComponent(Guid.generate(), component.type, component.name, component.description,
              new Map()
          )
      );
    } else {
      throw new Error(`Unknown component type '${componentType}'.`);
    }
  }

  onNext() {
    this.projectService.saveProject(this.project).subscribe(() => {
      console.log('Project successfully saved.');
    });
  }

  setActiveComponent(component: ProjectComponent) {
    this.activeComponent = component;
  }
}
