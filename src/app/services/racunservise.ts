import { Racun } from './../models/racunmodel';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class RacunService{

  racuni: Racun[];
    private readonly API_URL = 'http://localhost:8089/racun/';

    dataChange: BehaviorSubject<Racun[]> = new BehaviorSubject<Racun[]>([]);

    constructor(private httpClient: HttpClient){

    }

    get data(): Racun[] {
      return this.dataChange.value;
  }

    public getAllRacun(): Observable<Racun[]>{
        this.httpClient.get<Racun[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
        },
          (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
          });
    
        return this.dataChange.asObservable();
    
      }

      public addRacun(racun: Racun): void {
        this.httpClient.post(this.API_URL, racun).subscribe(data => {
  
        });
      }
  
      public updateRacun(racun: Racun): void {
        this.httpClient.put(this.API_URL + racun.id, racun).subscribe(data => {
  
        });
      }
  
      public deleteRacun(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe(data => {
  
        });
      }
}