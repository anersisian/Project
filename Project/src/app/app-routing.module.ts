import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { LoginComponent } from "./login/login.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { RegisterComponent } from "./register/register.component";
import { SubscriptionsComponent } from "./subscriptions/subscriptions.component";


  import { EditPhoneComponent } from './edit-phone/edit-phone.component';
import { ProfileComponent } from "./profile/profile.component";
import { LogoutComponent } from "./logout/logout.component";
import { AdminComponent } from "./admin/admin.component";
import { AccountPageComponent } from "./account-page/account-page.component";
import { EditSubscriptionComponent } from './edit-subscription/edit-subscription.component';
import { ViewSubscriptionComponent } from './view-subscription/view-subscription.component';
import { ReviewPageComponent } from './review-page/review-page.component';


const routes: Routes = [
  { path: "home", component: MainPageComponent },
  { path: "account-page/:userName", component: AccountPageComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "subscriptions", component: SubscriptionsComponent},
  { path: "profile/:userName", component: ProfileComponent},
  { path: "logout", component: LogoutComponent},
  { path: "admin/:userName", component: AdminComponent},
  { path: "profile/edit-phone/:userName", component: EditPhoneComponent},
  { path: "subscription/:_id", component: EditSubscriptionComponent},
  { path: "view-subscription/:_id", component: ViewSubscriptionComponent},
  { path: "review/:userName", component: ReviewPageComponent},
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
