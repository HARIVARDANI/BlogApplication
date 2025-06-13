import { Routes } from '@angular/router';
import { CommentRegisterComponent } from './component/auth/comment-register/comment-register.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { BlogDetailsComponent } from './component/blog-details/blog-details.component';
import { BlogListComponent } from './component/blog-list/blog-list.component';
import { AddBlogComponent } from './component/dashboard/add-blog/add-blog.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MyWorksComponent } from './component/dashboard/my-works/my-works.component';

export const routes: Routes = [
    {
        path:'',component:BlogListComponent
    },
    {
        path:'blog-detail/:id',component:BlogDetailsComponent
    },
    {
        path:'login',component:LoginComponent
    },
    {
        path:'register',component:RegisterComponent
    },
    {
        path: 'comment-register', component: CommentRegisterComponent 
     },
    {
        path:'dashboard',
        component:DashboardComponent,
        children:[
            {
                path:'add-blog',component:AddBlogComponent
            },
            {
                path:'my-works',component:MyWorksComponent
            },
            { path: '', redirectTo: 'add-blog', pathMatch: 'full' }, 
        ],
    },
    {
        path:'**',redirectTo:''
    },
];
