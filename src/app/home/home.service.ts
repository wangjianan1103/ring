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
                this.router.navigate(['add']);
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
    getBlog(parameters): any {
        if (parameters == null) {
            return;
        }
        let result: any;
        this.httpService.post('manage/blog/getBlog', parameters)
            .then(res => {
                let data = res.json();
                if (data.status == 0) {
                    result = data.content;
                    document.getElementById("title").innerText = "45678";
                    this.renderer.setText(document.getElementById("text"), result.content);
                } else {
                    alert(data.message);
                }
            })
            .catch(res => {
                console.error(res);
            });
        return result;
    }

    getHeroes(loanGid: string): Observable<any> {
        //noinspection TypeScriptUnresolvedFunction
        return this.http.post("http://127.0.0.1:1103/manage/blog/getBlog", loanGid, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
