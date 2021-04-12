import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemModel } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  item: ItemModel;
  id: number;
  form: FormGroup;
  errormessage: string;

  constructor(
    private _itemService: ItemService,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _cartService: CartService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._activatedRoute.pathFromRoot[2].url.subscribe(val => {
      this.id = +val[1].path;
      if(this.id){
        this._itemService.getItemById(this.id).subscribe(data => {
          this.item = data;
        });
      }
    });

    this.form = this._formBuilder.group({
      quentity: [1, [Validators.required, Validators.min(1), Validators.max(this.item?.qty)]]
    });

  }

  AddToCart(itemId: number, name: string){
    this.errormessage = ''
    let qty = this.form.get('quentity').value;
    if(qty > this.item.qty)
        this.errormessage = 'Invalid quantity'

      this._cartService.AddToCart({itemId: itemId, qty: qty});
      var conf = confirm(`You Successfully added ${name} item, Do you want to go to cart page?`);
      if(conf){
        this._router.navigate(['/cart']);
      }
  }

}
