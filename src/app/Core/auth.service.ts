import { Injectable, OnInit } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from "./models/user";
import { TokenResponse } from "./models/token";
import { RegisterUserModel } from "../models/register-user";

@Injectable()
export class AuthService implements OnInit {

    loginUrl: string = `http://localhost:53132/connect/token`;
    userUrl: string = `http://localhost:53132/api/auth/register`;
    isAuthenticated: boolean = false;
    token: string;
    constructor(
        private http: HttpClient,
        private _router: Router,
    ) { }

    async ngOnInit(): Promise<void> {
        let exist = this.checkExist();
        if(exist)
            this._router.navigate(['items'])
    }


    login(user: User): Observable<TokenResponse> {
        let body = new HttpParams()
        .set('username', user.email)
        .set('password', user.password)
        .set('client_id', 'onlineshop_angular')
        .set('client_secret', 'secret')
        .set('grant_type', 'password');
        return this.http.post<TokenResponse>(`${this.loginUrl}`, body.toString(), {
            headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
        }).pipe(
                tap(data => {
                    this.isAuthenticated = true;
                    localStorage.setItem('access_token', JSON.stringify(data.access_token));
                    this._router.navigate(['/items']);
                }),
            );
    }

    register(user: RegisterUserModel): Observable<boolean> {
        return this.http.post<boolean>(`${this.userUrl}`, user).pipe(
            tap(data => {
                if(data){
                    this.login({email: user.username, password: user.password}).subscribe(data => {})
                }
            })
        )
    }

    // private SetRoleNavigation(role: Roles): void {
    //     if (role == Roles.IsOwner)
    //         this._router.navigate(['doctor']);

    // }

    logout() {
        localStorage.removeItem('access_token');
        this.isAuthenticated = false;
        this._router.navigate(['/login']);
    }

    get getToken(): string {
        return ((localStorage.getItem('access_token') as string) ?? '').replace(/['"]+/g, '');
    }

    checkExist(): boolean {
        var token = localStorage.getItem('access_token') as string;
        if(token){
            this.isAuthenticated = true;
            return true;
        }
        return false;
    }
}