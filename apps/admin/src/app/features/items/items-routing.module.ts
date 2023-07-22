import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddItemsComponent } from './form/add-item';
import { EditItemsComponent } from './form/edit-item';

const routes: Routes = [
  {
    path: 'add',
    component: AddItemsComponent,
  },
  {
    path: 'edit/:id',
    component: EditItemsComponent,
  },
  {
    path: '',
    component: ListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
