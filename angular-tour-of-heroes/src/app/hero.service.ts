import { catchError, map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Hero} from "./hero";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { MessageService} from "./message.service";
import { Observable, of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap (_=> this.log(`deleted hero ${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      )

  }
  getHeroes(): Observable<Hero[]> {
    /*  const heroes = of(HEROES);                            ce code renvoi le tableau de mock-heroes
      this.messageService.add('HeroService: fetching heroes');
      return heroes*/
    return this.http.get<Hero[]>(this.heroesUrl)         // ce code utilise la method HttpClient
      .pipe(
        tap(_ => this.log('fetching heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_=> this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable <T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);

    }
  }

  private heroesUrl = 'api/heroes';

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  // récupère les termes du nom des héros recherché
  search(term: string): Observable<Hero[]> {
    if (!term.trim()){
      // si le terme recherché n'existe pas, le tableau de héros est vide
    return of([])
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(` no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // si aucun term est rentrée il renvoi un tableau vide
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  updateHero(hero:Hero): Observable <any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updateHero: ${hero.id}`)),
      catchError(this.handleError<any>(`updateHero`))
    )
  }
}
