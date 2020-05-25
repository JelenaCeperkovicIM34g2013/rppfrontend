import { Component, OnInit, ViewChild } from '@angular/core';
import { Racun } from '../models/racunmodel';
import { RacunService } from '../services/racunservise';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit {

  displayedColumns = ['id', 'datum', 'nacinPlacanja', 'actions'];
  exampleDatabase: RacunService;
  dataSource: MatTableDataSource<Racun>;
  selektovanRacun: Racun;
  
  @ViewChild (MatPaginator) paginator: MatPaginator;
  @ViewChild (MatSort) sort: MatSort;


  constructor(public httpClient: HttpClient, public racunService: RacunService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.racunService.getAllRacun().subscribe(data => {
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

public openDialog (flag: number, id?: number, datum?: Date, nacinPlacanja?: string) {
  const dialogRef = this.dialog.open(RacunDialogComponent, {data: {id: id, datum: datum, nacinPlacanja: nacinPlacanja}});
  dialogRef.componentInstance.flag = flag;
  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      this.loadData();
    }
  });
}

public selectRow(row) {
  this.selektovanRacun = row;
}

}


