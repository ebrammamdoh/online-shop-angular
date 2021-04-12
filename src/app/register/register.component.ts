import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Core/auth.service';
import { passwordMatcher } from '../Core/password.matcher';
import { Roles } from '../Core/roles.enum';
import { RegisterUserModel } from '../models/register-user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  passwordMessage: string;
  roles: any[];
  errorMessage: string;

  private validationMessages = {
    required: 'Please enter your password.',
    pattern: 'Please enter a valid password'
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private toastr: ToastrService ,
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      passwordGroup: this._formBuilder.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      }, { validator: passwordMatcher }),
      descAr: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      descEn: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      role: ['', [Validators.required]],
    });

    this.roles = Object.values(Roles)
      .map(key => ({ id: Roles[key], title: key }))
      .filter(key => {
          return typeof key.id === 'number'
      });
  }

  onSubmit() {
    this.form.disable();
    let user: RegisterUserModel = {
      descriptionar: this.form.get('descAr').value,
      descriptionen: this.form.get('descEn').value,
      username: this.form.get('email').value,
      password: this.form.get('passwordGroup.password').value,
      roles: +this.form.get('role').value
    }
    this._authService.register(user).subscribe(data=> {},
      error => {
        this.form.enable();
        this.errorMessage = 'Something went wrong, please try again';
      })
  }
}
