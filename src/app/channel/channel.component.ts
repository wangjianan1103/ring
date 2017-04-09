import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HomeService} from '../home/home.service';
import {HttpService} from '../http/http.service';

@Component({
    selector: 'channel',
    templateUrl: 'channel.html',
    providers: [HomeService, HttpService]
})
export class ChannelComponent implements OnInit {
    private channels: any[];
    private channelName: string;
    private channelDesc: string;
    private channelOrder: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private homeService: HomeService,
                private httpService: HttpService) {
    }

    ngOnInit(): void {
        /** init  **/
        this.channels = this.homeService.queryChannel();
    }

    /**
     * 添加标签
     */
    addChannel(): void{
        console.debug("添加标签");

        let body = JSON.stringify({
            channelName: this.channelName,
            channelDesc: this.channelDesc,
            channelOrder: this.channelOrder
        });

        this.httpService.post('channel/add', body)
            .then(res => {
                let data = res.json();
                if (data.status == 0) {
                    alert(data.message);
                    this.router.navigate(['channel']);
                } else {
                    alert(data.message);
                }
            })
            .catch(res => {
                console.error(res);
            });
    }

}