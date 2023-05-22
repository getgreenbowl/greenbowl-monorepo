import { Component } from '@angular/core';
import { ToolbarService } from '../../services/toolbar.service';
import { ToolbarOptions } from '../../types';
import { slugify } from '../../utils';
import { MetaDataService } from '../../services/meta-data.service';


@Component({
  selector: 'toolbar',
  styleUrls: ['./toolbar.scss'],
  template: `<div
    class="btn-toolbar  mb-2 justify-content-between"
    role="toolbar"
    aria-label="Toolbar with button groups"
  >
    <h4>{{ meta.gridTitle$ | async }}</h4>
    <div class="btn-group" role="group">
      <button
        *ngFor="let tool of toolbarService.options$ | async"
        type="button"
        class="btn border"
        [title]="tool.name"
        (click)="tool.handleClick.emit(tool)"
      >
        <i [class]="tool.icon"></i>
      </button>
    </div>
  </div>`,
})
export class GridToolbarComponent {
  constructor(
    public toolbarService: ToolbarService,
    public meta: MetaDataService
  ) {}

  handleOptionClick({ emit, name }: ToolbarOptions) {
    if (emit === false) return;
    this.toolbarService.emit({ name, id: slugify(name) });
  }
}
