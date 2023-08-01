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
    <div class="w-full overflow-auto border h-[75vh] no-scrollbar">
      <table
        cdk-table
        recycleRows
        [dataSource]="gridData.data$"
        class="w-full caption-bottom text-sm border-collapse"
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
              [ngClass]="{
                'text-left': column.alignment === 'left',
                'text-center': column.alignment === 'center',
                'text-right': column.alignment === 'right',
              }"
              class="h-10 text-sm px-4 font-medium capitalize tracking-md text-muted-foreground bg-background"
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
              [ngClass]="{
                'text-left': column.alignment === 'left',
                'text-center': column.alignment === 'center',
                'text-right': column.alignment === 'right',
              }"
              class="p-4"
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
            <td cdk-cell *cdkCellDef="let element">
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
          class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
          cdk-header-row
          *cdkHeaderRowDef="columnService.fields$ | async; sticky: true"
        ></tr>
        <tr
          cdk-row
          class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
          *cdkRowDef="let row; columns: columnService.fields$ | async"
        ></tr>

        <!-- NO DATA -->
        <tr *cdkNoDataRow>
          <td
            class="text-center py-5 h-[60vh]"
            [colSpan]="columnService.totalColumns$ | async"
          >
            <span
              *ngIf="loader.loading$ | async; else nodata"
              class="flex justify-center items-center"
            >
              <div
                class="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-500"
              ></div>
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
