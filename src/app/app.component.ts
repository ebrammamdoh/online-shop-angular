import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'online-shop';
  constructor(
    public _authService: AuthService,
    private _router: Router
  ){

  }
  ngOnInit(): void {
    
  }

  logout(){
    this._authService.logout();
  }
}
