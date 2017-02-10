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
    private channel_: string;
    private markList_: Array<any> = new Array();
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
     * 发布文章
     * @returns {any}
     */
    publishArticles(title: string, html: string): void {

        var ele = document.querySelector("channel");

        const channels = document.getElementsByName("channel");
        const marks = document.getElementsByName("mark");
        if (channels != null && marks != null) {
            for (let i = 0; i < channels.length; i++) {
                const channel = channels[i];

                document.getElementsByName("channel").item(i).
                if (channel.dataset.channelFlag == 1) {
                    this.channel_ = channel.dataset.channelGid;
                }
            }
            for (let i = 0; i < marks.length; i++) {
                const mark = marks[i];
                //noinspection TypeScriptUnresolvedVariable
                if (mark.dataset.markFlag == 1) {
                    this.markList_.push(mark.dataset.markGid);
                }
            }
        }
        if (this.channel_ == null || this.markList_ == null) {
            alert("不允许为空");
            return;
        }
        let body = JSON.stringify({
            name: title,
            type: '原创',
            channel: this.channel_,
            marks: this.markList_,
            message: html
        });
        this.httpService.post('manage/blog/add', body)
            .then(res => {
                let data = res.json();
                if (data.status == 0) {
                    alert(data.message);
                    this.router.navigate(['']);
                } else {
                    alert(data.message);
                }
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
