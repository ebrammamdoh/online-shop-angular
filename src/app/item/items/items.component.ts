import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemModel } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: ItemModel[];

  constructor(
    private _itemsService: ItemService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._itemsService.getItems().subscribe(data => {
      this.items = data;
    });

  }

  Details(id: number) {
    this._router.navigate(['items/details', id]);
  }
}
