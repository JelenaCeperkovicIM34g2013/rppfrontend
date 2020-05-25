import { StavkaRacuna } from './../models/stavkaRacunamodel';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StavkaRacunaService{

  stavkaRacunaService: StavkaRacunaService;
    private readonly API_URL = 'http://localhost:8089/stavkaRacuna/';
    private readonly API_URL_BYID = 'http://localhost:8089/stavkeZaRacuneId/';

    dataChange: BehaviorSubject<StavkaRacuna[]> = new BehaviorSubject<StavkaRacuna[]>([]);

    constructor(private httpClient: HttpClient){

    }

    public getStavkeRacuna(): Observable<StavkaRacuna[]>{
        this.httpClient.get<StavkaRacuna[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
        },
          (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
          });
    
        return this.dataChange.asObservable();
    
      }
      public getStavkeZaRacun(idRacuna): Observable<StavkaRacuna[]> {
        this.httpClient.get<StavkaRacuna[]>(this.API_URL_BYID + '/' + idRacuna).subscribe(data => {
          this.dataChange.next(data);
        },
          (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
          });
        return this.dataChange.asObservable();
      }

      public addStavkaRacuna(stavkaRacuna: StavkaRacuna): void {
        let racunObject = {id: stavkaRacuna.racun};
        let proizvodObject = {id: stavkaRacuna.proizvod};
        
        let stavkaRacunaToSend = JSON.parse(JSON.stringify(stavkaRacuna));
        stavkaRacunaToSend.racun = racunObject;
        stavkaRacunaToSend.proizvod = proizvodObject;

        this.httpClient.post(this.API_URL, stavkaRacunaToSend).subscribe();
      }
     
      public updateStavkaRacuna(stavkaRacuna: StavkaRacuna): void {
        this.httpClient.put(this.API_URL + stavkaRacuna.id, stavkaRacuna).subscribe();
      }
     
      public deleteStavkaRacuna(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
      }
}