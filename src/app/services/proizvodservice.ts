import { Injectable } from '@angular/core';
import { Proizvod } from '../models/proizvodmodel';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProizvodService{

  proizvodi: Proizvod[];

    private readonly API_URL = 'http://localhost:8089/proizvod/';

    dataChange: BehaviorSubject<Proizvod[]> = new BehaviorSubject<Proizvod[]>([]);

    constructor(private httpClient: HttpClient){

    }

    get data(): Proizvod[] {
      return this.dataChange.value;
  }

    public getAllProizvod(): Observable<Proizvod[]>{
        this.httpClient.get<Proizvod[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
          this.proizvodi = data;
        },
          (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
          });
    
        return this.dataChange.asObservable();
    
      }

      public addProizvod(proizvod: Proizvod): void {
        let proizvodjacObject = {id: proizvod.proizvodjac};
        
        let proizvodToSend = JSON.parse(JSON.stringify(proizvod));
        proizvodToSend.proizvodjac = proizvodjacObject;

        this.httpClient.post(this.API_URL, proizvodToSend).subscribe(data => {
        });
    }

    public updateProizvod(proizvod: Proizvod): void {
        this.httpClient.put(this.API_URL + proizvod.id, proizvod).subscribe(data => {
        });
    }

    public deleteProizvod(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe(data => {
        });
    }
}