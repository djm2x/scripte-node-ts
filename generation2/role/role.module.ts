import { UpdateComponent } from './update/update.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/mat.module';
import { RoleComponent } from './role.component';
import { RoleRoutingModule } from './role-routing.module';
import { ManageFilesModule } from 'src/app/manage-files/manage-files.module';


@NgModule({
  declarations: [RoleComponent, UpdateComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    HttpClientModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    ManageFilesModule,
  ],
  entryComponents: [
    UpdateComponent
  ]
})
export class RoleModule { }
