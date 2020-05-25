import { Injectable } from '@angular/core';
import { Proizvodjac } from '../models/proizvodjacmodel';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProizvodjacService{

  proizvodjaci: Proizvodjac[];

    private readonly API_URL = 'http://localhost:8089/proizvodjac/';

    dataChange: BehaviorSubject<Proizvodjac[]> = new BehaviorSubject<Proizvodjac[]>([]);

    constructor(private httpClient: HttpClient){

    }

    get data(): Proizvodjac[] {
      return this.dataChange.value;
  }

    public getAllProizvodjac(): Observable<Proizvodjac[]>{
      this.httpClient.get<Proizvodjac[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
        this.proizvodjaci = data;
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}

      public addProizvodjac(proizvodjac: Proizvodjac): void {
        this.httpClient.post(this.API_URL, proizvodjac).subscribe(data => {
  
        });
      }
  
      public updateProizvodjac(proizvodjac: Proizvodjac): void {
        this.httpClient.put(this.API_URL + proizvodjac.id, proizvodjac).subscribe(data => {
  
        });
      }
  
      public deleteProizvodjac(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe(data => {
  
        });
      }
}