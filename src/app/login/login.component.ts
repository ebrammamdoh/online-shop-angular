import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error: string;
  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.maxLength(100)]],
    });

  }

  onSubmit(){
    let email = this.form.get('email').value;
    let password = this.form.get('password').value;
    this.error = '';
    this._authService.login({email: email, password: password}).subscribe(data => {
      if(data){
        this._router.navigate(['/items']);
      }

     }, err => {
       console.log(err)
      this.error = 'Email or password are not valid'
     });
  }
}
