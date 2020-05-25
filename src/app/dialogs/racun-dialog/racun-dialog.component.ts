import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RacunService } from 'src/app/services/racunservise';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RacunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public racunService: RacunService) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.data.id = -1;
    this.racunService.addRacun(this.data);
    this.snackBar.open('Uspešno dodat racun: ' + this.data.datum, 'U redu', {duration: 2500});
  }

  public update(): void {
    this.racunService.updateRacun(this.data);
    this.snackBar.open('Uspešno modifikovan racun: ' + this.data.id, 'U redu', {duration: 2500});
  }

  public delete(): void {
    this.racunService.deleteRacun(this.data.id);
    this.snackBar.open('Uspešno obrisan racun: ' + this.data.id, 'U redu', {duration: 2500});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste!', 'U redu', {duration: 1000});
  }

  public dateChange(date) {
    console.log(date.value);

    this.data.datum = date.value;
  }
}
