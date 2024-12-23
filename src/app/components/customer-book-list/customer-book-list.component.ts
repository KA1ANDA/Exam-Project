import { Component, Input, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { OrdersService } from '../../services/orders.service';
import { OrderDetails } from '../../models/orderDedails';
import { CartOrder } from '../../models/cartOrder';

@Component({
  selector: 'app-customer-book-list',
  standalone: false,
  
  templateUrl: './customer-book-list.component.html',
  styleUrl: './customer-book-list.component.css'
})
export class CustomerBookListComponent implements OnInit {
  books: Book[] = [];
  bookCount: number = 0;
  selectedBook: Book | null = null; 
  @Input() curtomerName:string = ''

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
    this.bookCount++;  
    this.selectedBook = book;  
  
    if (this.selectedBook) {
      let totalPrice: number | null = null; 
  
      if (this.selectedBook.price) {
        totalPrice = this.selectedBook.price * this.bookCount;  
      }
  
      const order: CartOrder = {
        customerName:this.curtomerName,
        bookId: this.selectedBook.id,  
        quantity: this.bookCount,
        totalPrice: totalPrice  
      };
  
      this.addToCart(order);  
    }
  }
  

  decrease(): void {
    if (this.bookCount > 0) {
      this.bookCount--; 
    }
  }

  addToCart(order: CartOrder): void {
    this.ordersService.addToCart(order).subscribe({
      next: (res) => {
        console.log('Book added to order:', res);
      },
      error: (error) => {
        console.error('Error adding book to order:', error);
      }
    });
  }
}
