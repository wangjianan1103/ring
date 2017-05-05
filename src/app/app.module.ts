import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule, JsonpModule}    from '@angular/http';
// import {BrowserTransferStateModule} from '../modules/transfer-state/browser-transfer-state.module';

import {AppComponent}   from './app.component';
import {routing} from './app.routing';
import {NavbarComponent}         from './navbar/navbar.component';
import {HomeComponent} from './home/home.component'
import {BlogComponent} from './home/blog/blog.component'
import {ViewComponent} from './home/blog/view.component';
import {CheckboxClickColorDirective} from './config/checkboxClickColor.directive';
import {RadioClickColorDirective} from './config/radioClickColor.directive';
import {NavMenuDirective} from './config/navMenu.directive';
import {MenuToggleDirective} from './config/menuToggle.directive';
import {DashboardComponent}         from './dashboard/dashboard.component';
import {IndexComponent}         from './index/index.component';
import {MarkComponent} from './mark/mark.component';
import {ChannelComponent} from './channel/channel.component';
import {FriendComponent} from './friend/friend.component';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({
            appId: 'my-app-id'
        }),
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
        ViewComponent,
        CheckboxClickColorDirective,
        RadioClickColorDirective,
        DashboardComponent,
        NavMenuDirective,
        IndexComponent,
        MarkComponent,
        ChannelComponent,
        MenuToggleDirective,
        FriendComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}