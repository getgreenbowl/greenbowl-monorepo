import { Component } from '@angular/core';
import { GridDataService } from '../../services/data.service';
import { GridColumnService } from '../../services/columns.service';
import { STATIC_ACTION_HEADER } from '../../types';
import { LoadingService } from '../../services/loading.service';
import { ActionService } from '../../services/actions.service';

@Component({
  selector: 'base-data-table',
  styleUrls: ['../../gb-data-grid.scss'],
  template: `
    <div class="table-responsive-sm gb-table-container">
      <table
        cdk-table
        recycleRows
        [dataSource]="gridData.data$"
        class="table table-bordered table-sm table-hover mb-0"
      >
        <ng-container
          [cdkColumnDef]="column.field"
          [stickyEnd]="column.field === isAction"
          *ngFor="let column of columnService.columns$ | async"
        >
          <!-- HEADER -->
          <ng-container *ngIf="column.field !== isAction; else actionHeader">
            <th
              cdk-header-cell
              *cdkHeaderCellDef
              [class]="
                'text-capitalize bg-800 fw-400 thead-dark text-' +
                column.alignment
              "
            >
              <ng-container *ngIf="!column.head; else columnHeadOutlet">
                {{ column.title || column.field }}
              </ng-container>
              <ng-template #columnHeadOutlet>
                <ng-container *ngIf="column.head">
                  <ng-container
                    *ngTemplateOutlet="
                      column.head;
                      context: { $implicit: column }
                    "
                  ></ng-container>
                </ng-container>
              </ng-template>
            </th>
          </ng-container>
          <!-- HEADER -->

          <!-- DATA CELL -->
          <ng-container *ngIf="column.field !== isAction; else gridActions">
            <td
              cdk-cell
              *cdkCellDef="let element"
              [class]="'text-' + column.alignment"
            >
              <ng-container *ngIf="!column.cell; else cellOutlet">
                {{ element[column.field] }}
              </ng-container>

              <ng-template #cellOutlet>
                <ng-container *ngIf="column.cell">
                  <ng-container
                    *ngTemplateOutlet="
                      column.cell;
                      context: { $implicit: element, column }
                    "
                  ></ng-container>
                </ng-container>
              </ng-template>
            </td>
          </ng-container>
          <!-- DATA CELL -->

          <!-- ACTIONS -->
          <ng-template #actionHeader
            ><th cdk-header-cell *cdkHeaderCellDef class="bg-800">
              &nbsp;
            </th></ng-template
          >
          <ng-template #gridActions>
            <td
              cdk-cell
              *cdkCellDef="let element"
              class="text-center action-common"
            >
              <gb-action
                *ngFor="let action of actionService.actions$ | async"
                [icon]="action.icon"
                [tooltip]="action.tooltip"
                [cellData]="element"
                [column]="column"
                (handleClick)="action.handleClick.emit($event)"
                [action]="action.action"
              />
            </td>
          </ng-template>
          <!-- ACTIONS -->
        </ng-container>

        <tr
          class=" text-white"
          cdk-header-row
          *cdkHeaderRowDef="columnService.fields$ | async; sticky: true"
        ></tr>
        <tr
          cdk-row
          *cdkRowDef="let row; columns: columnService.fields$ | async"
        ></tr>

        <!-- NO DATA -->
        <tr *cdkNoDataRow>
          <td
            class="text-center py-5"
            [colSpan]="columnService.totalColumns$ | async"
          >
            <span *ngIf="loader.loading$ | async; else nodata">
              <i class="fas fa-circle-notch fa-spin fa-2xl"></i>
            </span>
            <ng-template #nodata>
              <span>No data</span>
            </ng-template>
          </td>
        </tr>
        <!-- NO DATA -->
      </table>
    </div>
  `,
})
export class BaseDataTableComponent {
  constructor(
    public gridData: GridDataService,
    public columnService: GridColumnService,
    public loader: LoadingService,
    public actionService: ActionService
  ) {}

  isAction = STATIC_ACTION_HEADER['field'];
}
