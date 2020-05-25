import { Racun } from './racunmodel';
import { Proizvod } from './proizvodmodel';
export class StavkaRacuna{
    id: number;
    redniBroj: number;
    kolicina: number;
    jedinica_mere: number;
    cena: number;
    racun: Racun;
    proizvod: Proizvod;
}