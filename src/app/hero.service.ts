import { Injectable } from '@angular/core';
import { Heroe } from './heroes/heroe.interface';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private messageService: MessageService, private http: HttpClient) { }
  getHeroes(): Observable<Heroe[]>{

    return this.http.get<Heroe[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Heroe[]>('getHeroes', []))
    );

  }
  getHero(id: number): Observable<Heroe>{
    const url = `${this.heroesUrl}/${id}`;

    this.messageService.add(`HeroService: fetched hero id=${id}`);

    return this.http.get<Heroe>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Heroe>(`getHero id=${id}`))
    );
  }
  private log(message: string): void {

    this.messageService.add(`HeroService: ${message}`);

  }

  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };

  }

  updateHero(hero: Heroe): Observable<any>{

    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('upadateHero'))
    );

  }

  addHero( hero: Heroe): Observable<Heroe>{
    return this.http.post<Heroe>(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap((newHero: Heroe) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Heroe>('addHero'))
    );
  }

  deleteHero(hero: Heroe | number): Observable<Heroe>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Heroe>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Heroe>('deleteHero'))
    );
  }

}


