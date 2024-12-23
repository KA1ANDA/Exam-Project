import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { CartOrder } from '../../models/cartOrder';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {

  orders:CartOrder[] = []

   constructor(
      private ordersService: OrdersService 
    ) {}


  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart(): void {
    this.ordersService.getUserCart().subscribe(res => {
      this.orders = res;
      console.log(res);
    });
  }

}
