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

    constructor(private router: Router,
                private route: ActivatedRoute,
                private homeService: HomeService) {
    }

    ngOnInit(): void {
        /** init  **/
        this.channels = this.homeService.queryChannel();
    }

    /**
     * 添加标签
     */
    addChannel(): void{
        console.debug("添加标签")
    }

}