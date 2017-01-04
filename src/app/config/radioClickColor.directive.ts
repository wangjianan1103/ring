import {Directive, ElementRef, HostListener, Renderer, Input} from "@angular/core";

@Directive({
    selector: '[radioClickColor]'
})
export class RadioClickColorDirective {
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
        let parentElementList = this.elementRef.nativeElement.parentElement.parentElement.childNodes;
        for (let i = 0; i < parentElementList.length; i++) {
            let parent = parentElementList[i];
            if (parent.nodeName == 'SPAN'){
                this.renderer.setElementAttribute(parent.childNodes[1], 'data-channel-flag', '0');
                this.renderer.setElementStyle(parent.childNodes[1], 'background-color', '#5bc0de');
            }
        }

        this.renderer.setElementAttribute(this.elementRef.nativeElement, 'data-channel-flag', '1');
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'background-color', '#468847');
    }

}