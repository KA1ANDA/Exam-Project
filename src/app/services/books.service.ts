import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  baseUrl:string = "http://localhost:5066/api/"

  constructor( private http : HttpClient) { }

  addBook(book : Book): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Books/add_book` , book)
  }

  getBooks(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}Books/get_books`)
  }

  updateBook(book : Book):Observable<any>{
    return this.http.put(`${this.baseUrl}Books/update_book` , book)
  }
}
