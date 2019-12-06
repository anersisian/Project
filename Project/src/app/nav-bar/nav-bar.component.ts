import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DataModelManagerService} from "../data-model-manager.service";
import { User } from '../data-model-classes';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user: User;

  constructor(private m: DataModelManagerService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
