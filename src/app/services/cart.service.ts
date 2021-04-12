import { Injectable, OnInit } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RegisterUserModel } from "../models/register-user";
import { ItemModel } from "../models/item";
import { SelectedItemModel } from "../models/selected-item";
import { OrderModel } from "../models/order";

@Injectable()
export class CartService {

    selectedItems: SelectedItemModel[] = [];

    baseUrl: string = `${environment.baseUrl}/api`;
    constructor(
        private http: HttpClient,
        private _router: Router,
    ) { }

    AddToCart(item: SelectedItemModel) {
        this.selectedItems.push(item);
    }

    CheckExistItems(): boolean {
        return this.selectedItems.length > 0
    }

    EmptyCart(){
        this.selectedItems = [];
    }
    
    RemoveItemFromCart(id: number) {
         let items = this.selectedItems.filter(item => item.itemId !== id); 
         this.selectedItems = items;
    }

    CalculateOrder(): Observable<OrderModel>{
       
        return this.http.post<OrderModel>(`${this.baseUrl}/Orders/CalculateOrder`, {
            orderItemModels: this.selectedItems
        });
    }

    Order(): Observable<OrderModel>{
        return this.http.post<OrderModel>(`${this.baseUrl}/Orders`, {
            orderItemModels: this.selectedItems
        });
    }
}