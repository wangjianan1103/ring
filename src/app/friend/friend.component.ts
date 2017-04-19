import {Component, OnInit, ElementRef, Renderer} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {HomeService} from "../home/home.service";
import {HttpService} from "../http/http.service";

@Component({
    selector: 'friend',
    templateUrl: 'friend.html',
    providers: [HomeService, HttpService]
})
export class FriendComponent implements OnInit {
    private friend_list: any[];
    private friendName: string;
    private friendLink: string;
    private friendDesc: string;


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
    addFriend(): void{
        console.debug("添加友链");

        let body = JSON.stringify({
            friendName: this.friendName,
            friendLink: this.friendLink,
            friendDesc: this.friendDesc
        });

        this.httpService.post('friend/add', body)
            .then(res => {
                let data = res.json();
                if (data.status == 0) {
                    alert(data.message);
                    this.router.navigate(['friend']);
                } else {
                    alert(data.message);
                }
            })
            .catch(res => {
                console.error(res);
            });
    }

}