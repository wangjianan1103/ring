import {Component, OnInit, ElementRef, Renderer} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HomeService} from './home.service';
import {HttpService} from '../http/http.service';
declare var editormd;

@Component({
    selector: 'home',
    templateUrl: 'home.html',
    providers: [HomeService, HttpService]
})

export class HomeComponent implements OnInit {
    private title: string;
    private marks: any[];
    private channels: any[];
    public gid: string;
    private blogs: any[];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private homeService: HomeService,
                private elementRef: ElementRef,
                private renderer: Renderer) {
    }

    ngOnInit(): void {
        this.title = '';

        /** init  **/
        this.marks = this.homeService.queryMark();
        this.channels = this.homeService.queryChannel();
        this.blogs = this.homeService.queryBlog();
    }

    update(gid: any) {
        this.router.navigate(['add'], {queryParams: {gid: gid}});
    }

    delete(gid: string) {
        if (gid == null) {
            alert("gid is null");
        }
        this.homeService.deleteBlog(gid);
    }
}