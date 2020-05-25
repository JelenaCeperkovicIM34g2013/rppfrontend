import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProizvodService } from 'src/app/services/proizvodservice';
import { ProizvodjacService } from '../../services/proizvodjacservice';
import { Proizvodjac } from '../../models/proizvodjacmodel';

@Component({
  selector: 'app-proizvod-dialog',
  templateUrl: './proizvod-dialog.component.html',
  styleUrls: ['./proizvod-dialog.component.css']
})
export class ProizvodDialogComponent implements OnInit {
  proizvodjaci: Proizvodjac[] = [];
  public flag: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProizvodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public proizvodService: ProizvodService,
    public proizvodjaciService: ProizvodjacService
  ) { }

  ngOnInit(): void {
    this.proizvodjaciService.getAllProizvodjac().subscribe(data => {
      this.proizvodjaci = data;
    });
  }

  public add(): void {
    this.data.id = -1;
    this.proizvodService.addProizvod(this.data);
    this.snackBar.open('Uspešno dodat proizvod: ' + this.data.naziv, 'U redu',
      {
        duration: 2500
      });
  }

  public update(): void {
    this.proizvodService.updateProizvod(this.data);
    this.snackBar.open('Uspešno modifikovan proizvod: ' + this.data.id, 'U redu',
      {
        duration: 2500
      });
  }

  public delete(): void {
    this.proizvodService.deleteProizvod(this.data.id);
    this.snackBar.open('Uspešno obrisan proizvod: ' + this.data.id, 'U redu',
      {
        duration: 2500
      });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu',
    {
      duration: 1000
    });
  }

}
