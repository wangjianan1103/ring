import {Directive, Input} from "@angular/core";

@Directive({ selector: '[beTrue]' })
export class BeTrueDirective {
    constructor(
    ) { }
    @Input() set beTrue(condition: any) {
        console.info(condition)
    }
}