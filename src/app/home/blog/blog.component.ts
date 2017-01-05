import {Component, OnInit, ElementRef, Renderer} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {HomeService} from '../home.service';
import {HttpService} from '../../http/http.service';
declare var editormd;

@Component({
    selector: 'blog',
    templateUrl: 'blog.html',
    providers: [HomeService, HttpService]
})

export class BlogComponent implements OnInit {
    private title: string;
    private marks: any[];
    private channels: any[];
    public gid: string;
    private blogs: any[];
    private updateBlog: any;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private homeService: HomeService,
                private elementRef: ElementRef,
                private renderer: Renderer) {
    }

    ngOnInit(): void {
        /** init  **/
        this.marks = this.homeService.queryMark();
        this.channels = this.homeService.queryChannel();
        this.blogs = this.homeService.queryBlog();
        let param = this.route.snapshot.queryParams;
        if(param.gid != null) {
            this.homeService.getBlog(param.gid);
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
            imageUploadURL: "http://api.wangjianan.top/upload/put",
            crossDomainUpload : true,
            uploadCallbackURL : "http://work.wangjianan.top/upload_callback.html",
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
                /**
                 * @param {Object}      cm         CodeMirror对象
                 * @param {Object}      icon       图标按钮jQuery元素对象
                 * @param {Object}      cursor     CodeMirror的光标对象，可获取光标所在行和位置
                 * @param {String}      selection  编辑器选中的文本
                 */
                PublishArticles: () => {
                    this.homeService.publishArticles(this.title, editor_model.getHTML());

                }
            },
            lang: {
                toolbar: {
                    PublishArticles: "发布文章"
                }
            }
        });

    }
}