import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorModule } from './Core/http-interceptor';
import { AuthService } from './Core/auth.service';
import { AuthGuard } from './Core/auth.guard';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartService } from './services/cart.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpInterceptorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
    }),
    AppRoutingModule

    // AuthModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGuard,
    ToastrService,
    CartService,
    // OidcConfigService,
    // OidcSecurityService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: configureAuth,
    //   deps: [OidcConfigService],
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
