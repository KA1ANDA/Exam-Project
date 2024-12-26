import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BooksService } from '../../services/books.service';
import { OrdersService } from '../../services/orders.service';
import { CartItem } from '../../models/cartItem';


@Component({
  selector: 'app-customer-page',
  standalone: false,
  
  templateUrl: './customer-page.component.html',
  styleUrl: './customer-page.component.css'
})
export class CustomerPageComponent  {
  customerName:string = localStorage.getItem('customerName') || ''

  cartOrders : CartItem[] = [] 

  cart : boolean = false
  

  books: Book[] = [];
  
  
    constructor(
      public bookService: BooksService,
      private ordersService: OrdersService 
    ) {}
  
 
  

  toggleCart(){
    this.cart = !this.cart
  }

  onNameChange() {
    localStorage.setItem('customerName', this.customerName);
  }

 
}
