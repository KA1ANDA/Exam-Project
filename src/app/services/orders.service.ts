import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cartItem';
import { Order } from '../models/order';
import { OrderDetail } from '../models/orderDetail';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  baseUrl:string = "http://localhost:5066/api/"

  constructor( private http : HttpClient) { }

  createOrder(order : Order): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Orders/create_order` , order)
  }
  
  addBookOrderDetails(order : OrderDetail): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Orders/add_book_order_details` , order)
  }

  getOrders():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}Orders/get_orders`)
  }

  getOrderDetails(order:Order):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Orders/get_order_details` , order)
  }
  


}
