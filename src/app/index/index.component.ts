import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'index',
    templateUrl: 'index.html',
    providers: []
})

export class IndexComponent implements OnInit {

    constructor(private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
    }

}