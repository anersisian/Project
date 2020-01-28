import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AngularSvgIconModule } from "angular-svg-icon";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { DataModelManagerService } from './data-model-manager.service';

//kek modules
import { AuthService } from './auth.service';
import { GuardAuthService } from './guard-auth.service';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { LogoutComponent } from './logout/logout.component';
import { InterceptTokenService } from './intercept-token.service';
import { JwtModule } from '@auth0/angular-jwt';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { ScrollToModule } from "@nicky-lenaers/ngx-scroll-to";
import { EditSubscriptionComponent } from './edit-subscription/edit-subscription.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const appRoutes: Routes = [{ path: "login", component: LoginComponent }];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavBarComponent,
    LoginComponent,
    NotFoundPageComponent,
    RegisterComponent,
    LogoutComponent,
    SubscriptionsComponent,
    ProfileComponent,
    AdminComponent,
    EditSubscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSvgIconModule,
    BrowserAnimationsModule,
    ScrollToModule.forRoot(),
    FormsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        authScheme: 'JWT'
      }
    })
  ],
  providers: [
    DataModelManagerService,
    AuthService,
    GuardAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptTokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
