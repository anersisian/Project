import { Component, OnInit } from '@angular/core';
import { DataModelManagerService } from '../data-model-manager.service';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: [ './main-page.component.css' ]
})
export class MainPageComponent implements OnInit {
	whichMode: Boolean = true;

	constructor(private m: DataModelManagerService) {}

	ngOnInit() {
		this.m.theme.subscribe((mode) => (this.whichMode = mode));
	}
}
