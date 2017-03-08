import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {HomeService} from "../home.service";
import {HttpService} from "../../http/http.service";

@Component({
    selector: 'viewBlog',
    templateUrl: 'view.component.html',
    providers: [HomeService, HttpService]
})
export class ViewComponent implements OnInit {
    blog = {};

    constructor(private router: Router,
                private route: ActivatedRoute,
                private location: Location,
                private httpService: HttpService) {
    }

    ngOnInit(): void {
        this.httpService.post('manage/blog/getBlog', this.route.snapshot.params['id'])
            .then(res => {
                let blogInfo = res.json().content;
                this.blog = blogInfo.blogLoan;
            });
    }

    goBack(): void {
        this.location.back();
    }
}