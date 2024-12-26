import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { OrdersService } from '../../services/orders.service';
import { CartItem } from '../../models/cartItem';



@Component({
  selector: 'app-customer-book-list',
  standalone: false,
  
  templateUrl: './customer-book-list.component.html',
  styleUrl: './customer-book-list.component.css'
})
export class CustomerBookListComponent implements OnInit {
  @Input() cartOrders: CartItem[] = []; 
  books: Book[] = [];


  constructor(
    public bookService: BooksService,
    private ordersService: OrdersService 
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe(res => {
      this.books = res;
      console.log(res);
    });
  }

  increase(book: Book): void {
    
  }
  

  decrease(): void {
    
  }

  addOrder(order: CartItem) {
    this.cartOrders.push(order);
    console.log(this.cartOrders , 'esaaa state')
  }
}
