import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProizvodjacService } from '../services/proizvodjacservice';
import { Proizvodjac } from '../models/proizvodjacmodel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ProizvodjacDialogComponent } from '../dialogs/proizvodjac-dialog/proizvodjac-dialog.component';

@Component({
  selector: 'app-proizvodjac',
  templateUrl: './proizvodjac.component.html',
  styleUrls: ['./proizvodjac.component.css']
})
export class ProizvodjacComponent implements OnInit {

  displayedColumns = ['id','adresa','kontakt','naziv','actions'];
  dataSource: MatTableDataSource<Proizvodjac>;
  exampleDatabase: ProizvodjacService;

  @ViewChild (MatPaginator) paginator: MatPaginator;
  @ViewChild (MatSort) sort: MatSort;


  constructor(public httpClient: HttpClient, public proizvodjacService: ProizvodjacService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.proizvodjacService.getAllProizvodjac().subscribe(data => {
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

public openDialog (flag: number, id?: number, adresa?: string, kontakt?: string, naziv?: string) {
  const dialogRef = this.dialog.open(ProizvodjacDialogComponent, {data: {id: id, adresa: adresa, kontakt: kontakt, naziv: naziv}});
  dialogRef.componentInstance.flag = flag;
  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.loadData();
    }
  });
}

}