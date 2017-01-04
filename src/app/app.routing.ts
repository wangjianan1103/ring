import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component'
import {BlogComponent} from './home/blog/blog.component'

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: 'add',
        component: BlogComponent
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);