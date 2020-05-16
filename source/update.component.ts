import { UowService } from 'src/app/services/uow.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/models';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  myForm: FormGroup;
  o: User;
  title = '';
  roles = ['user', 'admin'];
  services = ['DG', 'DIPE', 'DRSI/SBC', 'DRSI/SAI'];
  fonctions = ['Directeur', 'Chef de departement', 'Assistant', 'Cadre'];
  hide = true;
  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any
    , private fb: FormBuilder, private uow: UowService) { }

  ngOnInit() {
    this.o = this.data.model;
    this.title = this.data.title;
    this.createForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(o: User): void {
    this.dialogRef.close(o);
  }

  createForm() {
    this.myForm = this.fb.group({
      id: this.o.id,
      firstName: [this.o.firstName, Validators.required],
      lastName: [this.o.lastName, Validators.required],
      email: [this.o.email, [Validators.required, Validators.email]],
      password: [this.o.password, Validators.required],
      role: [this.o.role, Validators.required],
      //
      verificationCode: [this.o.verificationCode, Validators.required],
      emailVerified: [this.o.emailVerified, Validators.required],
      userStatus: [this.o.userStatus, Validators.required],
      //
      matricule: [this.o.matricule, Validators.required],
      service: [this.o.service, Validators.required],
      fonction: [this.o.fonction, Validators.required],
    });
  }

  resetForm() {
    this.o = new User();
    this.createForm();
  }

}
