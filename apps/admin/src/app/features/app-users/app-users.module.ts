import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppUsersRoutingModule } from './app-users-routing.module';
import { AppUserListComponent } from './list/list.component';
import { GbGridShellComponent } from 'src/app/shared/grid-shell/grid-shell';
import { GbGridColumnsComponent } from 'src/app/shared/ui/gb-data-grid/components/base-table/columns';
import { GbActionComponent } from 'src/app/shared/ui/gb-data-grid/components/base-table/action';
import { GbGridToolbarComponent } from 'src/app/shared/ui/gb-data-grid/components/toolbar/gb-toolbar';
import { GbBadgeComponent } from 'src/app/shared/ui/badge';

@NgModule({
  declarations: [AppUserListComponent],
  imports: [
    CommonModule,
    AppUsersRoutingModule,
    GbGridShellComponent,
    GbGridColumnsComponent,
    GbActionComponent,
    GbGridToolbarComponent,
    GbBadgeComponent,
  ],
})
export class AppUsersModule {}
