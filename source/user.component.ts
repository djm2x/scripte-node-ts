import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { merge } from 'rxjs';
import { UpdateComponent } from './update/update.component';
import { UowService } from 'src/app/services/uow.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeleteService } from 'src/app/components/delete/delete.service';
import { User } from 'src/app/Models/models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  update = new EventEmitter();
  isLoadingResults = true;
  resultsLength = 0;
  isRateLimitReached = false;

  dataSource = [];
  columnDefs = [
    { columnDef: 'firstName', headName: '' },
    { columnDef: 'matricule', headName: '' },
    { columnDef: 'service', headName: '' },
    { columnDef: 'fonction', headName: '' },
    { columnDef: 'userStatus', headName: '' },
    { columnDef: 'email', headName: '' },
    { columnDef: 'option', headName: 'OPTION' },
  ].map(e => {
    e.headName = e.headName === '' ? e.columnDef.toUpperCase() : e.headName.toUpperCase();
    return e;
  });

  displayedColumns = this.columnDefs.map(e => e.columnDef);

  panelOpenState = false;
  firstName = new FormControl('');
  lastName = new FormControl('');

  constructor(private uow: UowService, public dialog: MatDialog, private mydialog: DeleteService, ) { }

  ngOnInit() {
    this.getPage(0, 10, 'id', 'desc');
    merge(...[this.sort.sortChange, this.paginator.page, this.update]).subscribe(
      r => {
        r === true ? this.paginator.pageIndex = 0 : r = r;
        !this.paginator.pageSize ? this.paginator.pageSize = 10 : r = r;
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.isLoadingResults = true;
        this.getPage(
          startIndex,
          this.paginator.pageSize,
          this.sort.active ? this.sort.active : 'id',
          this.sort.direction ? this.sort.direction : 'desc',
          this.firstName.value === '' ? '*' : this.firstName.value,
          this.lastName.value === '' ? '*' : this.lastName.value,
        );
      }
    );
  }

  reset() {
    this.firstName.setValue('');
    this.lastName.setValue('');
    this.update.next(true);
  }

  search() {
    this.update.next(true);
  }

  getPage(startIndex, pageSize, sortBy, sortDir, ...args: any[]) {
    this.uow.users.getAll(startIndex, pageSize, sortBy, sortDir, args).subscribe(
      (r: any) => {
        console.log(r.list);
        this.dataSource = r.list;
        this.resultsLength = r.count;
        this.isLoadingResults = false;
      }
    );
  }

  openDialog(o: User, text) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '750px',
      disableClose: true,
      data: { model: o, title: text }
    });

    return dialogRef.afterClosed();
  }

  add() {
    this.openDialog(new User(), 'Ajouter Utilisateur').subscribe(result => {
      if (result) {
        this.uow.users.post(result).subscribe(
          r => {
            this.update.next(true);
          }
        );
      }
    });
  }

  edit(o: User) {
    this.openDialog(o, 'Modifier Utilisateur').subscribe((result: User) => {
      if (result) {
        this.uow.users.put(result.id, result).subscribe(
          r => {
            this.update.next(true);
          }
        );
      }
    });
  }

  async delete(id: number) {
    const r = await this.mydialog.openDialog('Utilisateur').toPromise();
    if (r === 'ok') {
      this.uow.users.delete(id).subscribe(() => this.update.next(true));
    }
  }

}

