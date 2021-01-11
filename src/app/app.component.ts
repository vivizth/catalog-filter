import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, filter, map, startWith, tap, withLatestFrom } from 'rxjs/operators';
import {ListService} from './list.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'category';
  filterCatalog$: Observable<string[]>;
  form: FormGroup;

  constructor(private fb: FormBuilder, private listService: ListService){
    this.form = fb.group({
      query: ['']
    });
    const query = this.form.get('query').valueChanges.pipe(startWith(''));

    const allCatalog$ = this.listService.getCatalog().pipe(
      catchError(e => of([]))
    );
    this.filterCatalog$ = combineLatest([allCatalog$, query]).pipe(
      map(this.doFilter)
    )
  }

  doFilter = ([list, query]: [string[], string]) => {
    if(!query) { return list; }

    query = query.toLowerCase();
    return list.filter(l => { 
      l = l.toLowerCase();
      const isMatch = l.indexOf(query) > -1;
      return isMatch;
    })
  }
  
}
