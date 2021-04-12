import { Injectable, NgModule } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from "./auth.service";

@Injectable()
export class HttpReqestInterceptor implements HttpInterceptor {

    constructor(
        private _authService: AuthService,
    ) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = this._authService.getToken;
        // console.log(token.replace(/['"]+/g, ''));
        if (token) {
            const newReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
            return next.handle(newReq);
        }
        else {
            return next.handle(req);
        }
    }
}

@NgModule({
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: HttpReqestInterceptor,
        multi: true
    }]
})
export class HttpInterceptorModule { }