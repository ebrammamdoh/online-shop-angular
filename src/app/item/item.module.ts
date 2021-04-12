import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items/items.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemService } from '../services/item.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';

const routes: Routes = [
  {
    path: '',
    component: ItemsComponent,
  },
  {
    path: 'details/:id',
    component: ItemDetailsComponent,
  }
]


@NgModule({
  declarations: [ItemsComponent, ItemDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ItemService
  ]
})
export class ItemModule { }
