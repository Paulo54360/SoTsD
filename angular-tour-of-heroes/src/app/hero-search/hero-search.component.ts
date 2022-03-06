import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero'
import { HeroService } from '../hero.service'
import { Observable, Subject} from "rxjs";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})

export class HeroSearchComponent implements OnInit {

  constructor(private heroService: HeroService) { }

  heroes$!: Observable<Hero[]>;

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // Attend 300ms après chaque frappe du clavier pour prendre en compte la lettre frappé
      debounceTime(300),
      // ignorer le nouveau terme s'il est identique au précédent
      distinctUntilChanged(),
      // passer à un nouvel observable de recherche chaque fois que le terme change
      switchMap((term: string) => this.heroService.searchHeroes(term))
    )
  }

  private  searchTerms = new Subject<string>();

  search(term:string):void{
    this.searchTerms.next(term);
  }
}
