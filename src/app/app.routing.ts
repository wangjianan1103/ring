import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BlogComponent} from './home/blog/blog.component';
import {ViewComponent} from './home/blog/view.component';
import {MarkComponent} from './mark/mark.component';
import {ChannelComponent} from './channel/channel.component';

const appRoutes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'blog', component: HomeComponent},
    {path: 'mark', component: MarkComponent},
    {path: 'channel', component: ChannelComponent},
    {path: 'view/:id', component: ViewComponent},
    {
        path: 'add',
        component: BlogComponent
    }
    // {path: '', redirectTo: 'index', pathMatch: 'full'}
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);