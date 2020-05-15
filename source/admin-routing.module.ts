import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserComponent } from './user/user.component';
import { DashComponent } from './dash/dash.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'generale', pathMatch: 'full' },
      { path: 'generale', loadChildren: () => import('./dash/dash.module').then(m => m.DashModule), data: {animation: 'generale'} },
      { path: 'generale2', loadChildren: () => import('./dash/dash.module').then(m => m.DashModule), data: {animation: 'generale2'} },
      { path: 'user', component: UserComponent, data: {animation: 'user'} },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
