import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { LoginComponent } from "./login/login.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { RegisterComponent } from "./register/register.component";
import { SubscriptionsComponent } from "./subscriptions/subscriptions.component";
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: "home", component: MainPageComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "subscriptions", component: SubscriptionsComponent},
  { path: "profile/:userName", component: ProfileComponent},
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
