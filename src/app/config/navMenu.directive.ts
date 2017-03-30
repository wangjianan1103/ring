import {Directive, ElementRef, HostListener, Renderer, Input} from "@angular/core";

@Directive({
    selector: '[ui-nav]'
})
export class NavMenuDirective {
    private _defaultSize = 1;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer
    ) { }

    @HostListener('mouseenter') onMouseEnter() {
    }

    @HostListener('mouseleave') onMouseLeave() {
    }

    @HostListener('click') onClick() {
        let parentElement = this.elementRef.nativeElement.parentElement;
        let isTrue = parentElement.classList.contains('active');
        // 将已经激活的移除
        let rootElement = parentElement.parentElement;
        for (let i = 0; i < rootElement.children.length; i++) {
            let childElement = rootElement.children.item(i);
            if (childElement.getAttribute('class') == 'active') {
                childElement.removeAttribute('class');
            }
        }
        // 设置此次点击的激活状态
        if (!isTrue) {
            parentElement.setAttribute('class', 'active');
        }
    }

}