import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, startWith, tap, withLatestFrom } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'category';
  api: 'https://api.publicapis.org/categories';
  allList$: Observable<string[]>;
  filter$: Observable<string[]>;
  form: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder){
    this.form = fb.group({
      query: ['']
    })
    this.allList$ = this.http.get<string[]>('https://api.publicapis.org/categories');
    const query = this.form.get('query').valueChanges.pipe(startWith(''));
    this.filter$ = combineLatest([this.allList$, query]).pipe(
      map(this.doFilter)
    )
  }

  doFilter = ([list, query]) => {
    query = query.toLowerCase();
    return list.filter(l => { 
      l = l.toLowerCase();
      return l.indexOf(query) > -1;
    })
  }
  
}
