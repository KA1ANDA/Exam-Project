import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../models/book';
import { OrdersService } from '../../services/orders.service';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-book-card',
  standalone: false,
  
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
    @Input() cartOrders: CartItem[] = []; 
    @Output() addOrder = new EventEmitter<CartItem>();
    @Input() book? : Book

  bookCount : number = 0
 


  constructor(public orderService:OrdersService){}

  increase():void{
    this.bookCount++
  }

  decrease():void{
    this.bookCount--
  }




 

  addToCart(book: Book) {
    
    const existingOrder = this.cartOrders.find(order => order.bookId === book.id);
  
    if (existingOrder && book.price) {
     
      if (existingOrder.quantity !== undefined && existingOrder.quantity !== null) {
        existingOrder.quantity += this.bookCount;
        existingOrder.price = existingOrder.quantity * book.price;
      } else {
       
        existingOrder.quantity = this.bookCount;
        existingOrder.price = existingOrder.quantity * book.price;
      }
    } else {
      const totalPrice = book.price ? book.price * this.bookCount : 0;
  
      const order = new CartItem(
        null,                            
        localStorage.getItem('customerName'), 
        book.id,                         
        this.bookCount,                    
        totalPrice,                        
        book.name,                         
        book.author                        
      );
  
      this.addOrder.emit(order);
    }
  }
}
