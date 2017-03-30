import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HomeService} from '../home/home.service';
import {HttpService} from '../http/http.service';

@Component({
    selector: 'mark',
    templateUrl: 'mark.html',
    providers: [HomeService, HttpService]
})
export class MarkComponent implements OnInit {
    private marks: any[];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private homeService: HomeService) {
    }

    ngOnInit(): void {
        /** init  **/
        this.marks = this.homeService.queryMark();
    }

}