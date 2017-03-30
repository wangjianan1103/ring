import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.html',
    providers: []
})

export class DashboardComponent implements OnInit {

    constructor(private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
    }

}