import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
/*{imports}*/

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      { path: 'dash', loadChildren: () => import('./dash/dash.module').then(m => m.DashModule), data: {animation: 'dash'} },
      { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), data: {animation: 'user'} },
{ path: 'role', loadChildren: () => import('./role/role.module').then(m => m.RoleModule), data: {animation: 'role'} },
{ path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule), data: {animation: 'blog'} },
{ path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule), data: {animation: 'category'} },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
