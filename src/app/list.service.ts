import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const api = 'https://api.publicapis.org/categories';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getCatalog() {
    return this.http.get<string[]>(api);
  }
}
