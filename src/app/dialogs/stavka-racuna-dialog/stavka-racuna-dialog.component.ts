import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RacunDialogComponent } from '../racun-dialog/racun-dialog.component';
import { RacunService } from '../../services/racunservise';
import { StavkaRacunaService } from '../../services/stavkaRacunaservice';
import { ProizvodService } from '../../services/proizvodservice';
import { ProizvodjacService } from '../../services/proizvodjacservice';
import { Proizvod } from '../../models/proizvodmodel';
import { Racun } from '../../models/racunmodel';

@Component({
  selector: 'app-stavka-racuna-dialog',
  templateUrl: './stavka-racuna-dialog.component.html',
  styleUrls: ['./stavka-racuna-dialog.component.css']
})
export class StavkaRacunaDialogComponent implements OnInit {

  public flag: number;
  public proizvodi: Proizvod[] = [];
  public racuni: Racun[] = [];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StavkaRacunaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public stavkaRacunaService: StavkaRacunaService,
    public proizvodService: ProizvodService,
    public racunService: RacunService) { }

  ngOnInit(): void {
    this.proizvodService.getAllProizvod().subscribe(data => {
      this.proizvodi = data;
    });

    this.racunService.getAllRacun().subscribe(data => {
      this.racuni = data;
    });
  }

  public add(): void {
    this.data.id = -1;
    this.stavkaRacunaService.addStavkaRacuna(this.data);
    this.snackBar.open('Uspešno dodata stavka racuna: ' + this.data.cena, 'U redu', {duration: 2500});
  }

  public update(): void {
    this.stavkaRacunaService.updateStavkaRacuna(this.data);
    this.snackBar.open('Uspešno modifikovana stavka racuna: ' + this.data.id, 'U redu', {duration: 2500});
  }

  public delete(): void {
    this.stavkaRacunaService.deleteStavkaRacuna(this.data.id);
    this.snackBar.open('Uspešno obrisana stavka racuna: ' + this.data.id, 'U redu', {duration: 2500});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste!', 'U redu', {duration: 1000});
  }

}
