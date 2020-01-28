import { Component, OnInit } from "@angular/core";
import { User } from "../data-model-classes";
import { DataModelManagerService } from "../data-model-manager.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-account-page",
  templateUrl: "./account-page.component.html",
  styleUrls: ["./account-page.component.css"]
})
export class AccountPageComponent implements OnInit {
  user: User;
  users: User[];

  constructor(
    private m: DataModelManagerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let userName = this.route.snapshot.params["userName"];

    this.m.usersGetAll().subscribe(u => (this.users = u));

    this.m.usersGetByUsername(userName).subscribe(u => {
      this.user = u;
      if (!this.user.subscriptionInfo) {
        this.user.subscriptionInfo = [];
      }
      console.log(this.user.userName);
      this.m.user = this.user;
    });
  }
}
