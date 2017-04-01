import {Directive, ElementRef, HostListener, Renderer} from "@angular/core";

@Directive({
    selector: '[menu-toggle]'
})
export class MenuToggleDirective {
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
        console.log('abc');
        let dataSet = this.elementRef.nativeElement.dataset;
        let appId = dataSet.target;
        let toggle = dataSet.toggle;

        // this.elementRef.nativeElement.setAttribute("class", 'active');
        let app = this.elementRef.nativeElement.ownerDocument.getElementById(appId);
        if (app != null) {
            let isTrue = app.classList.contains(toggle);
            if (isTrue) {
                app.classList.remove(toggle)
            } else {
                // app.setAttribute("class", toggle);
                app.classList.add(toggle);
            }
        }
    }

}