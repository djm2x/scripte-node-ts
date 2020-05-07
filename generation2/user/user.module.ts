import { UpdateComponent } from './update/update.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/mat.module';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { ManageFilesModule } from 'src/app/manage-files/manage-files.module';


@NgModule({
  declarations: [UserComponent, UpdateComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
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
export class UserModule { }
