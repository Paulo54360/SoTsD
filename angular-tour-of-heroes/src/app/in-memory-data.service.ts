import { Hero} from './hero';
import { Injectable } from '@angular/core';
import { InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {
createDb(){
  const heroes = [
  {id: 1, name: 'Emet selch', image:"../../assets/emetSelch.png"},
  {id: 2, name: "Graha'tia", image:"../../assets/exarque.png"},
  {id: 3, name: 'hythlodaeus',image:"../../assets/Hythlodaeus.png"},
  {id: 4, name: 'Tataru', image:"../../assets/tataru.png"},
  {id: 5, name: "Y'shtola", image:"../../assets/Yshtola.png"},
  {id: 6, name: 'Urianger',image:"../../assets/urianger.png"},
  {id: 7, name: 'Estinien', image:"../../assets/estinien.png"},
  {id: 8, name: 'Thancred', image:"../../assets/thancred.png"},
  {id: 9, name: 'Alphinaud',image:"../../assets/alphinaud.png"},
  {id: 10, name: 'Alisaie', image:"../../assets/alisaie.png"},
];
  return {heroes};
}

genId(heroes:Hero[]):number {
  return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 11 : 1
}
}
