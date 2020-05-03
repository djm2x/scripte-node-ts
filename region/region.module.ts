import { UpdateComponent } from './update/update.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/mat.module';
import { RegionComponent } from './region.component';
import { RegionRoutingModule } from './region-routing.module';
import { ManageFilesModule } from 'src/app/manage-files/manage-files.module';


@NgModule({
  declarations: [RegionComponent, UpdateComponent],
  imports: [
    CommonModule,
    RegionRoutingModule,
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
export class RegionModule { }
