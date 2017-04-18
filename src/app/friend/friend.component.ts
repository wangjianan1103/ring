import {Component, OnInit, ElementRef, Renderer} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {HomeService} from "../home/home.service";
import {HttpService} from "../http/http.service";

@Component({
    selector: 'friend',
    templateUrl: 'friend.html',
    providers: []
})
export class FriendComponent implements OnInit {
    private friend_list: any[];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private homeService: HomeService,
                private httpService: HttpService,
                private elementRef: ElementRef,
                private renderer: Renderer) {
    }

    ngOnInit(): void {
        /** init  **/
        this.friend_list = this.homeService.queryFriend();
    }

    /**
     * 添加标签
     */
    addChannel(): void{
        console.debug("添加标签");

        this.httpService.post('channel/add', null)
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