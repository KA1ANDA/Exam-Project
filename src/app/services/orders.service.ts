import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetails } from '../models/orderDedails';
import { Observable } from 'rxjs';
import { CartOrder } from '../models/cartOrder';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
 baseUrl:string = "http://localhost:5066/api/"

  constructor( private http : HttpClient) { }

  addBookToOrder(order : OrderDetails): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Orders/add_book_to_order` , order)
  }

  addToCart(order : CartOrder): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Orders/add_to_cart` , order)
  }

  getUserCart(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}Orders/get_user_cart_by_customer`)
  }

 
}
