import {Directive, ElementRef, HostListener, Renderer, Input} from "@angular/core";

@Directive({
    selector: '[checkboxClickColor]'
})
export class CheckboxClickColorDirective {
    private _defaultSize = 1;

    constructor(private elementRef: ElementRef, private renderer: Renderer) {

    }

    @HostListener('mouseenter') onMouseEnter() {
    }

    @HostListener('mouseleave') onMouseLeave() {
    }

    @HostListener('click') onClick() {
        let color = this.elementRef.nativeElement.style.backgroundColor;
        let flag = this.elementRef.nativeElement.dataset.markFlag;
        if (flag == 0) {
            this.renderer.setElementAttribute(this.elementRef.nativeElement, 'data-mark-flag', '1');
            this.renderer.setElementStyle(this.elementRef.nativeElement, 'background-color', '#468847');
        } else {
            this.renderer.setElementAttribute(this.elementRef.nativeElement, 'data-mark-flag', '0');
            this.renderer.setElementStyle(this.elementRef.nativeElement, 'background-color', '#5bc0de');
        }
    }

}