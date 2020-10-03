import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

    header = new FormControl();

    constructor() {
    }

    ngOnInit(): void {
    }

    doNothing(): void {
        console.log('here');
    }

}
