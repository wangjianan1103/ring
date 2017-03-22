import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {
    private path = 'http://api.oopmind.com/';
    private headers = new Headers(
        {
            'Content-Type': 'application/json; charset=utf-8'
        }
    );
    private options = new RequestOptions({headers: this.headers});

    constructor(public http: Http) {
    }

    public post = function (url: string, body: any): Promise<any> {
        let postUrl = this.path + url;
        return this.http.post(postUrl, body, this.options)
            .toPromise()
            .then(res => res);
    };

}