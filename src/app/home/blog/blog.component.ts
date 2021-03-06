import {Component, OnInit, ElementRef, Renderer, ViewChildren, QueryList} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {HomeService} from "../home.service";
import {HttpService} from "../../http/http.service";
import "rxjs/add/operator/toPromise";

declare var editormd;

@Component({
    selector: 'blog',
    templateUrl: 'blog.html',
    providers: [HomeService, HttpService]
})

export class BlogComponent implements OnInit {
    public title: string;
    public marks: any[];
    public channels: any[];
    public blogs: any[];
    // update model
    public id: string;
    public channelGid: string;
    public updateBlog: any;
    public channel_: string;
    public updateMarkList: Array<any> = new Array();
    public markList_: Array<any> = new Array();

    @ViewChildren('channel_name') channelList: QueryList<any>;
    @ViewChildren('mark_name') markList: QueryList<any>;

    constructor(private httpService: HttpService,
                private router: Router,
                private route: ActivatedRoute,
                private homeService: HomeService,
                private elementRef: ElementRef,
                private renderer: Renderer) {
    }

    ngOnInit(): void {
        /** init data **/
        this.title = "";
        this.marks = [];
        this.channels = [];
        this.blogs = [];
        this.id = "";
        this.channelGid = "";
        this.updateBlog = {};
        this.channel_ = "";
        this.updateMarkList = [];
        this.markList_ = [];

        /** init  **/
        this.marks = this.homeService.queryMark();
        this.channels = this.homeService.queryChannel();
        this.blogs = this.homeService.queryBlog();

        let param = this.route.snapshot.queryParams;
        if(param['gid'] != null) {
            this.getBlog(param['gid']);
        }

        let editor_model = editormd({
            id: "editormd",
            width: "100%",
            height: 640,
            path: "./assets/lib/editormd/lib/",
            codeFold: true,
            //syncScrolling : false,
            saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
            searchReplace: true,
            //watch : false,                // 关闭实时预览
            htmlDecode: "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
            //toolbar  : false,             //关闭工具栏
            //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
            emoji: true,
            taskList: true,
            tocm: true,         // Using [TOCM]
            tex: true,                   // 开启科学公式TeX语言支持，默认关闭
            flowChart: true,             // 开启流程图支持，默认关闭
            sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
            //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
            //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
            //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
            //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
            //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
            imageUpload: true,
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL: "http://api.oopmind.com/upload/put",
            crossDomainUpload : true,
            uploadCallbackURL : "http://work.oopmind.com/upload_callback.html",
            // previewTheme : "dark",
            toolbarIcons: function () {
                return [
                    "bold", "del", "italic", "quote", "|",
                    "h3", "h4", "h5", "h6", "|",
                    "list-ul", "list-ol", "hr", "|",
                    "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "emoji", "html-entities", "pagebreak", "|",
                    "goto-line", "watch", "preview", "fullscreen", "clear", "search", "|",
                    "PublishArticles"
                ]
            },
            toolbarIconsClass: {
                PublishArticles: "fa-share"  // 指定一个FontAawsome的图标类
            },
            toolbarIconTexts: {
                PublishArticles: "发布文章"  // 如果没有图标，则可以这样直接插入内容，可以是字符串或HTML标签
            },
            toolbarHandlers: {
                PublishArticles: () => {
                    this.publishArticles(this.title, editor_model.getHTML(), editor_model.getMarkdown().toString());
                }
            },
            lang: {
                toolbar: {
                    PublishArticles: "发布文章"
                }
            }
        });

    }

    getBlog(loanGid: string) {
        this.httpService.post('manage/blog/getBlog', loanGid)
            .then(res => {
                let blogInfo = res.json().content;
                let blog = blogInfo.blogLoan;
                let markList = blogInfo.markList;
                console.info(blog);
                console.info(markList);
                this.updateBlog = blog;
                this.title = blog.name;
                this.id = blog.id;
                this.channelGid=blog.channelGid;

                // is true
                let allMarks = this.marks;
                let newMarks: Array<any> = new Array();
                let oldMarks: Array<any> = new Array();

                for (let i=0; i < allMarks.length; i++) {
                    let allMarkGid = allMarks[i].gid;
                    let flag = true;
                    for (let j=0; j< markList.length; j++) {
                        if (allMarkGid == markList[j]) {
                            flag = false;
                            newMarks.push(allMarks[i]);
                        }
                    }
                    if (flag) {
                        oldMarks.push(allMarks[i]);
                    }
                }
                this.marks = oldMarks;
                this.updateMarkList = newMarks;
            });
    }

    /**
     * 发布文章
     */
    publishArticles(title: string, html: string, markdownContent: string): void {
        const channels = this.channelList;
        const marks = this.markList;
        if (!(channels != null && marks != null)) {
        } else {
            this.channelList.forEach(ef => {
                //noinspection TypeScriptUnresolvedVariable
                let dataset = ef.nativeElement.dataset;
                //noinspection TypeScriptUnresolvedVariable
                if (dataset.channelFlag == 1) {
                    this.channel_ = dataset.channelGid;
                }
            });

            this.markList.forEach(ef => {
                //noinspection TypeScriptUnresolvedVariable
                let dataset = ef.nativeElement.dataset;
                //noinspection TypeScriptUnresolvedVariable
                if (dataset.markFlag == 1) {
                    this.markList_.push(dataset.markGid);
                }
            });
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
            message: html,
            markdownContent: markdownContent,
            id: this.id == "" ? null : this.id
        });

        this.httpService.post('manage/blog/do', body)
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
     * 添加标签
     */
    addMark(): void{
        console.debug("添加标签")
    }
}