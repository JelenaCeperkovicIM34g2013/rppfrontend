import { StavkaRacunaService } from './../services/stavkaRacunaservice';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { StavkaRacuna } from '../models/stavkaRacunamodel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Racun } from '../models/racunmodel';
import { MatDialog } from '@angular/material/dialog';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';
import { StavkaRacunaDialogComponent } from '../dialogs/stavka-racuna-dialog/stavka-racuna-dialog.component';

@Component({
  selector: 'app-stavka-racuna',
  templateUrl: './stavka-racuna.component.html',
  styleUrls: ['./stavka-racuna.component.css']
})
export class StavkaRacunaComponent implements OnInit {

  displayedColumns = ['id', 'redniBroj', 'kolicina', 'jedinicaMere', 'cena', 'racun', 'proizvod', 'actions'];
  dataSource: MatTableDataSource<StavkaRacuna>;

  @Input() selektovanRacun: Racun;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public stavkaRacunaService: StavkaRacunaService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.selektovanRacun.id) {
      this.loadData();
    }
  }
  public loadData() {
    this.stavkaRacunaService.getStavkeZaRacun(this.selektovanRacun.id).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);

      // pretraga po nazivu ugnježdenog objekta
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'proizvod' ? currentTerm + data.proizvod.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

       // sortiranje po nazivu ugnježdenog objekta
       // tslint:disable-next-line:no-shadowed-variable
       this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'proizvod': return data.proizvod.naziv.toLocaleLowerCase();
          default: return data[property];
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

  public openDialog (flag: number, id?: number, cena?: number, jedinicaMere?: string, kolicina?: number, redniBroj?: number, proizvod?: number, racun?: number) {
    const dialogRef = this.dialog.open(StavkaRacunaDialogComponent, {data: {id: id, cena: cena, jedinicaMere: jedinicaMere, kolicina: kolicina, redniBroj: redniBroj, proizvod: proizvod, racun: racun}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }
}
