import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { CartItem } from '../../models/cartItem';
import { Order } from '../../models/order';
import { forkJoin, switchMap } from 'rxjs';
import { OrderDetail } from '../../models/orderDetail';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  
  @Input() cartOrders: CartItem[] = []; 
  @Output() cartToggled = new EventEmitter<void>();

  constructor(public orderService:OrdersService ){}

    toggleCart() {
    
      this.cartToggled.emit(); // Emit event to notify the child component
    }

    get totalPrice(): number {
      return this.cartOrders.reduce((sum, order) => sum + (order.price != null ? order.price : 0) , 0);
    }

    createOrder() {
      const customerName = localStorage.getItem('customerName'); 
    
      const order: Order = new Order();
      order.userName = customerName;
      order.totalAmount = this.totalPrice;
    
      console.log(order);
    
      this.orderService.createOrder(order).pipe(
        switchMap((res) => {
          console.log(res, 'Order created response');
    
          const orderId = res; // Ensure your backend returns orderId
    
          if (!orderId) {
            throw new Error('Order ID is missing in the response');
          }
    
          // Map cartOrders to an array of addBookOrderDetails requests
          const orderDetailsRequests = this.cartOrders.map(cartItem => {
            const orderDetail = new OrderDetail();
            orderDetail.orderId = orderId;
            orderDetail.bookId = cartItem.bookId;
            orderDetail.quantity = cartItem.quantity;
            orderDetail.totalPrice = cartItem.price;
    
            return this.orderService.addBookOrderDetails(orderDetail);
          });
    
          // Use forkJoin to execute all addBookOrderDetails calls in parallel
          return forkJoin(orderDetailsRequests);
        })
      ).subscribe({
        next: (responses) => {
          console.log('All book order details added successfully', responses);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
    
}
