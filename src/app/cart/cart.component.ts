import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from '../models/order';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  order: OrderModel;
  errormessage: string;
  hasOrders: boolean;

  constructor(
    private _cartService: CartService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this._cartService.CheckExistItems()) {
      this._cartService.CalculateOrder().subscribe(data => {
        if (data) {
          this.order = data;
          this.hasOrders = true;
        }
      });
    }

  }

  OrderNow() {
    this.errormessage = '';
    var conf = confirm(`Are you about to pay ${this.order.totalPrice} EGP?`);
    if (conf) {
      this._cartService.Order().subscribe(data => {
        if (data) {
          alert('Thank you for purchase');
          this._cartService.EmptyCart();
          this.hasOrders = false;
          this._router.navigate(['/items'])
        }
      }, err => {
        this.errormessage = 'Something went wrong. Please try again';
      })
    }
  }

  Remove(id: number) {
    this._cartService.RemoveItemFromCart(id);
    if (this._cartService.CheckExistItems()) {
      this._cartService.CalculateOrder().subscribe(data => {
        if (data) {
          this.order = data;
          
        }
      }, err => {
        this.errormessage = 'Something went wrong. Please try again';
      });
    }
    else {
      this.hasOrders = false;
    }
  }
}
