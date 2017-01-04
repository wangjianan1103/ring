import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule, JsonpModule}    from '@angular/http';

import {AppComponent}   from './app.component';
import {routing} from './app.routing';
import {NavbarComponent}         from './navbar/navbar.component';
import {HomeComponent} from './home/home.component'
import {BlogComponent} from './home/blog/blog.component'
import {CheckboxClickColorDirective} from './config/checkboxClickColor.directive';
import {RadioClickColorDirective} from './config/radioClickColor.directive';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        JsonpModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        BlogComponent,
        CheckboxClickColorDirective,
        RadioClickColorDirective
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}