import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _authService: AuthService,
                private _router: Router) {}

    async canActivate(
            next: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): Promise<boolean> {
        let isExist = await this._authService.checkExist;
        if(isExist) {
            return true;
        }
        this._router.navigate(['']);
        return false;
    }
}