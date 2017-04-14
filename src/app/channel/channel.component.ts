import {Component, OnInit, ElementRef, Renderer, HostListener} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HomeService} from '../home/home.service';
import {HttpService} from '../http/http.service';
declare var jQuery:any;

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
                private httpService: HttpService,
                private elementRef: ElementRef,
                private renderer: Renderer) {
    }

    ngOnInit(): void {
        /** init  **/
        this.channels = this.homeService.queryChannel();

        jQuery('body').confirmation({
            selector: '[data-toggle="confirmation"]',
            onConfirm: function() {
                alert('cancel');
            },
            onCancel: function() { alert('cancel') }
        });
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

    /**
     * 删除标签
     * @param gid
     */
    delete(gid: string){
        alert(gid);
        if (confirm("Are you sure?")) {
            console.debug(gid);

        }

        if (gid == null) {
            alert("gid 不允许为null")
        }
    }

}