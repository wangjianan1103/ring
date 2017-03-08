import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BlogComponent} from './home/blog/blog.component';
import {ViewComponent} from './home/blog/view.component';

const appRoutes: Routes = [
    {path: 'index', component: HomeComponent},
    {path: 'view/:id', component: ViewComponent},
    {
        path: 'add',
        component: BlogComponent
    },
    {path: '', redirectTo: 'index', pathMatch: 'full'}
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);