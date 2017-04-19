import {Injectable, ElementRef, Renderer} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Router, ActivatedRoute} from "@angular/router";
import {HttpService} from '../http/http.service';

@Injectable()
export class HomeService {
    private headers = new Headers(
        {
            'Content-Type': 'application/json; charset=utf-8'
        }
    );
    private options = new RequestOptions({headers: this.headers});

    constructor(private http: Http,
                public httpService: HttpService,
                private router: Router,
                private elementRef: ElementRef,
                private renderer: Renderer) {
    }

    /**
     * 查询blog
     */
    deleteBlog(gid: string) {
        this.httpService.post('manage/blog/delete', gid)
            .then(res => {
                let data = res.json();
                alert(data.message);
                this.router.navigate(['index']);
            })
            .catch(res => {
                console.error(res);
            });
    }

    /**
     * 查询mark
     */
    queryMark(): any[] {
        let marks: Array<any> = new Array();
        let body = JSON.stringify({});
        this.httpService.post('manage/mark/getMark', body)
            .then(res => {
                let data = res.json();
                if (data.status == 0) {
                    let content = data.content;
                    for (let i = 0; i < content.length; i++) {
                        let mark = content[i];
                        marks.push(mark);
                    }
                } else {
                    alert(data.message);
                }
            })
            .catch(res => {
                console.error(res);
            });
        return marks;
    }

    /**
     * 查询channel
     */
    queryChannel(): any[] {
        let channels: Array<any> = new Array();
        let body = JSON.stringify({});
        this.httpService.post('manage/channel/getChannel', body)
            .then(res => {
                let data = res.json();
                if (data.status == 0) {
                    var content = data.content;
                    for (let i = 0; i < content.length; i++) {
                        let channel = content[i];
                        channels.push(channel);
                    }
                } else {
                    alert(data.message);
                }
            })
            .catch(res => {
                console.error(res);
            });
        return channels;
    }

    /**
     * 查询blog
     */
    queryBlog(): any[] {
        let blogs: Array<any> = new Array();
        let body = JSON.stringify({});
        this.httpService.post('manage/getBills', body)
            .then(res => {
                let data = res.json();
                if (data.status == 0) {
                    var content = data.content;
                    for (let i = 0; i < content.length; i++) {
                        let blog = content[i];
                        blogs.push(blog);
                    }
                } else {
                    alert(data.message);
                }
            })
            .catch(res => {
                console.error(res);
            });
        return blogs;
    }

    /**
     * 获取blog
     */
    getBlog(blogGid: string): any {
        if (blogGid == null) {
            return;
        }
        let blog_demo: any;
        this.httpService.post('manage/blog/getBlog', blogGid)
            .then(res => {
                let data = res.json();
                if (data.status == 0) {
                    let demo = data.content;
                    blog_demo = demo;
                } else {
                    alert(data.message);
                }
            })
            .catch(res => {
                console.error(res);
            });
        return blog_demo;
    }


    /**
     * 查询friend
     */
    queryFriend(): any[] {
        let friends: Array<any> = new Array();
        let body = JSON.stringify({});
        this.httpService.post('friend/getFriend', body)
            .then(res => {
                let data = res.json();
                if (data.status == 0) {
                    var content = data.content;
                    for (let i = 0; i < content.length; i++) {
                        let friend = content[i];
                        friends.push(friend);
                    }
                } else {
                    alert(data.message);
                }
            })
            .catch(res => {
                console.error(res);
            });
        return friends;
    }
}
