import { Component, OnInit } from "@angular/core";
import { User } from "../data-model-classes";
import { DataModelManagerService } from "../data-model-manager.service";
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-account-page",
  templateUrl: "./account-page.component.html",
  styleUrls: ["./account-page.component.css"],
  providers: [DatePipe]
})
export class AccountPageComponent implements OnInit {
  user: User;
  users: User[];
  myDate = new Date();
  currentDate: String;
  message: string;

  currentDateTemp: String;

  constructor(
    private m: DataModelManagerService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.currentDate = ('0' + this.myDate.getDate()).toString().slice(-2) + "/"+('0'+(this.myDate.getMonth() + 1)).toString().slice(-2) + "/" + this.myDate.getFullYear().toString();
  }

  ngOnInit() {
    let userName = this.route.snapshot.params["userName"];

    //this.m.usersGetAll().subscribe(u => (this.users = u));

    this.m.usersGetByUsername(userName).subscribe(u => {
      this.user = u;
      if (!this.user.subscriptionInfo) {
        this.user.subscriptionInfo = [];
      }
      this.m.user = this.user;
    });

    var currentDateTemp = this.currentDate.split("/",3);
    var subscriptionDateTemp = this.m.user.subscriptionInfo[0].date.split("/",3);
    console.log(currentDateTemp[0] + " " + subscriptionDateTemp[0]);
    if((Number(currentDateTemp[0]) > Number(subscriptionDateTemp[0])))
    {
      if((Number(currentDateTemp[1]) >= Number(subscriptionDateTemp[1])))
      {
        if((Number(currentDateTemp[2]) >= Number(subscriptionDateTemp[2])))
        {
          console.log("Date has expired -> moving sub to previousSub");
          this.m.user.pastDeliveries.push(this.m.user.subscriptionInfo[0]);
          console.log(this.m.user.pastDeliveries[0]);
          this.m.usersUpdatePastDeliveries(this.m.user._id, this.m.user.pastDeliveries).subscribe(u=>this.message = u.message);
    
          let tempDate = currentDateTemp[2]+'-'+currentDateTemp[1]+'-'+currentDateTemp[0]+'T00:00:00';
    
          console.log(tempDate);
          
          
    //nepravilno!!!!
          let newDate = new Date(tempDate);
          newDate.setDate(newDate.getDate() + 7);
    
          console.log(newDate);
    
          this.currentDateTemp = ('0' + newDate.getDate()).toString().slice(-2) + "/"+('0'+(newDate.getMonth() + 1)).toString().slice(-2) + "/" + newDate.getFullYear().toString();
          
          this.m.user.subscriptionInfo[0].date = this.currentDateTemp;
          this.m.usersUpdateSubscriptionInfo(this.m.user._id, this.m.user.subscriptionInfo).subscribe(u=>this.message = u.message);
          console.log("updating page...");
          window.location.reload();
        }
      }
    }else
    {
      console.log("Date has not expired yet");
    }
  }
}
