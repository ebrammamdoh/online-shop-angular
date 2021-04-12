import { Injectable, OnInit } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RegisterUserModel } from "../models/register-user";
import { ItemModel } from "../models/item";

@Injectable()
export class ItemService {

    baseUrl: string = `${environment.baseUrl}/api`;
    constructor(
        private http: HttpClient,
        private _router: Router,
    ) { }

    getItems(): Observable<ItemModel[]> {
        return this.http.get<ItemModel[]>(`${this.baseUrl}/items/getall`)
    }

    getItemById(id: number): Observable<ItemModel> {
        return this.http.get<ItemModel>(`${this.baseUrl}/items/GetById/${id}`)
    }
}