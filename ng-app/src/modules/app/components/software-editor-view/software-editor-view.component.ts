import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import {ProjectService} from '../../services/project.service';
import {Project} from '../../core/projects/project';
import {ProjectComponent} from '../../core/projects/project-component';
import {ComponentGroup} from '../../core/components/component-group';
import {ComponentSchema} from '../../core/components/component-schema';
import {Guid} from '../../core/utils/guid';
import {ComponentsService} from '../../services/components.service';
import {IExpandableGroup} from '../expandable-groups/expandable-groups.component';

@Component({
  templateUrl: 'software-editor-view.component.html',
  styleUrls: ['software-editor-view.component.css']
})
export class SoftwareEditorViewComponent implements OnInit {
  project: Project;
  componentGroups: ComponentGroup[] = [];
  componentSchemas: Map<string, ComponentSchema>;
  dragEnterCounter = 0;
  activeComponent: ProjectComponent = null;

  propertiesGroup: IExpandableGroup = {
    name: 'Properties',
    expanded: false,
    items: []
  };

  constructor(private route: ActivatedRoute, private router: Router,
              private projectService: ProjectService,
              private componentsService: ComponentsService) {
  }

  ngOnInit(): void {
    this.fetchSchemas();
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
   * Fetches component schemas from the ComponentsService.
   */
  private fetchSchemas() {
    this.componentsService.getSchemas()
      .subscribe((schemas) => this.componentSchemas = schemas, (e) => {
        console.error('Error occurred while retrieving of component schemas.', e);
      });
  }

  onDragStart(e: DragEvent, item: ComponentSchema) {
    e.dataTransfer.setData(`text/${item.type}`, item.type);
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
    if (this.componentSchemas.has(componentType)) {
      this.project.components.push(new ProjectComponent(Guid.generate(), componentType, new Map()));
    } else {
      throw new Error(`Unknown component type '${componentType}'.`);
    }
  }

  onNext() {
    this.projectService.saveProject(this.project).subscribe(() => {
      console.log('Project successfully saved.');
    });
  }

  onGoToProjectMetadata() {
    this.router.navigate([`promo/project/metadata/${this.project.id}`]);
  }

  setActiveComponent(component: ProjectComponent) {
    if (component === this.activeComponent) {
      return;
    }

    this.activeComponent = component;
    if (this.activeComponent === null) {
      return
    }

    this.propertiesGroup.items = Array.from(
      this.componentSchemas.get(component.type).properties.entries()
    ).map(([type, schema]) => {
      return { schema, storage: this.activeComponent.properties };
    });
  }

  getComponentName(component: ProjectComponent) {
    return component.properties.get('name') ||
      this.componentSchemas.get(component.type).name;
  }

  removeComponent(index: number) {
    this.project.components.splice(index, 1);
  }
}
