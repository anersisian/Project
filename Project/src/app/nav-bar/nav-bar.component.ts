import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataModelManagerService } from '../data-model-manager.service';
import { User } from '../data-model-classes';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: [ './nav-bar.component.css' ]
})
export class NavBarComponent implements OnInit {

	user: User;
	isLogged: Boolean;
	userProfile: String;
	variable: Boolean;
	whichMode: Boolean = true;
	constructor(
		private m: DataModelManagerService,
		private route: ActivatedRoute,
		private a: AuthService,
		private jwtHelper: JwtHelperService,
    private router: Router,
    private translate: TranslateService
	) {
    translate.setDefaultLang('en');
		this.isLogged = JSON.parse(localStorage.getItem('logged'));

		let tokenn = localStorage.getItem('access_token');

		if (tokenn) {
			let tokenDecoded = this.jwtHelper.decodeToken(tokenn);
			this.userProfile = tokenDecoded.userName;
		}
	}

	ngOnInit() {
		this.m.theme.subscribe((mode) => (this.whichMode = mode));
	}

   useLanguage(language: string) {
    this.translate.use(language);
}

	change() {
		if (this.whichMode === true) {
			this.m.changeTheme(false);
		} else {
			this.whichMode = false;
			this.m.changeTheme(true);
		}
	}
}
