import {Component} from '@angular/core';

@Component({
  selector: 'frunze-workspace',
  templateUrl: 'workspace.component.html',
  styleUrls: ['workspace.component.css']
})
export class Workspace {
  private activePageIndex: number = 0;
  private pages: any[] = [{
    id: 'page#1',
    name: 'Page #1'
  }, {
    id: 'page#2',
    name: 'Page #2'
  }];

  addPage() {
    // TODO: Implement.
    const newPageIndex = this.pages.length + 1;
    this.pages.push({
      id: `page#${newPageIndex}`,
      name: `Page #${newPageIndex}`
    });
  }

  removePage(pageId: string) {
    // TODO: Implement.
    if (!pageId) {
      return false;
    }

    const pageToDeleteIndex = this.pages.findIndex(
      (page) => page.id === pageId
    );

    if (pageToDeleteIndex < 0) {
      return false;
    }

    this.pages.splice(pageToDeleteIndex, 1);
  }

  goToPage(pageIndex: number) {
    // TODO: Implement.
    if (pageIndex < 0 || pageIndex >= this.pages.length) {
      throw new Error(`Page index ${pageIndex} is out of range!`);
    }

    this.activePageIndex = pageIndex;
  }

  getActivePage() {
    // TODO: Implement.
    return this.pages[this.activePageIndex];
  }

  getPages() {
    // TODO: Implement and don't return the original array.
    return this.pages;
  }
}
