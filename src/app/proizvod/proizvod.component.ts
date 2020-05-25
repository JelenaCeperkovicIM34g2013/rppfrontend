import { Component, OnInit, ViewChild } from '@angular/core';
import { Proizvod } from '../models/proizvodmodel';
import { ProizvodService } from '../services/proizvodservice';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProizvodDialogComponent } from '../dialogs/proizvod-dialog/proizvod-dialog.component';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.css']
})
export class ProizvodComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'proizvodjac', 'actions'];
  exampleDatabase: ProizvodService;
  dataSource: MatTableDataSource<Proizvod>;

  @ViewChild (MatPaginator) paginator: MatPaginator;
  @ViewChild (MatSort) sort: MatSort;


  constructor(public httpClient: HttpClient, public proizvodService: ProizvodService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.proizvodService.getAllProizvod().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)

    this.dataSource.sortingDataAccessor = (data, property) => {
      switch (property) {
        case 'id' : return data[property];
        default: return data[property].toLocaleLowerCase();
      }
    };

  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
});

}
applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}

public openDialog(flag: number, id?: number,naziv?: string, proizvodjac?: number) {
  const dialogRef = this.dialog.open(ProizvodDialogComponent, {
    data: { id: id, naziv: naziv, proizvodjac: proizvodjac }
  });
  dialogRef.componentInstance.flag = flag;
  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.loadData();
    }
  });
}

}
