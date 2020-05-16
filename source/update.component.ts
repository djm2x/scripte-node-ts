import { UowService } from 'src/app/services/uow.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User$ } from 'src/app/models/models';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  myForm: FormGroup;
  o: User$;
  title = '';
  /*selections*/

  folderToSaveInServer = 'users';

  imageTo = new Subject();
  imageFrom = new Subject();

  eventSubmitFromParent = new Subject();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any
    , private fb: FormBuilder, private uow: UowService) { }

  ngOnInit() {
    this.o = this.data.model;
    this.title = this.data.title;
    this.createForm();

    this.imageFrom.subscribe(r => this.myForm.get('imageUrl').setValue(r));

    setTimeout(() => {
      this.imageTo.next(this.o.imageUrl);
    }, 100);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(o: User$): void {
    if (o.id === 0) {
      o.id = null;
      this.uow.presidents.post(o).subscribe(r => {
        this.eventSubmitFromParent.next(true);
        this.dialogRef.close(o);
      });
    } else {
      this.uow.presidents.put(o.id, o).subscribe(r => {
        this.eventSubmitFromParent.next(true);
        this.dialogRef.close(o);
      });
    }
  }

  createForm() {
    this.myForm = this.fb.group({
      /*{myFormfields}*/
    });
  }

  resetForm() {
    this.o = new User$();
    this.createForm();
  }

}
