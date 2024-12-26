import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Book } from '../../models/book';
import { BooksService } from '../../services/books.service';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order';
import { OrderDetail } from '../../models/orderDetail';

@Component({
  selector: 'app-manager-page',
  standalone: false,
  
  templateUrl: './manager-page.component.html',
  styleUrl: './manager-page.component.css'
})
export class ManagerPageComponent implements OnInit {
  visible: boolean = false;
  orders : Order[] = []
  orderDetails: OrderDetail[] = [];
  books: Book[] = []; 

  openDropdownId: number | null = null; 

  constructor(public fb:FormBuilder , public bookService:BooksService , public orderService:OrdersService){}


  ngOnInit(): void {
    this.getOrders()
    this.getBooks()
  }

  formControl = this.fb.group({
    name: ["", Validators.required],
    price: [0, Validators.required],
    author: ["", Validators.required],
    quantity: [1, Validators.required],
  });




  toggleDropdown(orderId?: number | null): void {
    if(orderId){
      this.openDropdownId = this.openDropdownId === orderId ? null : orderId;
    }

    this.getOrderDetails(orderId)
   
  }


  getBooks(): void {
    this.bookService.getBooks().subscribe((res) => {
      this.books = res;
    });
  }

  getOrders():void{
    this.orderService.getOrders().subscribe(res => {
      this.orders = res
    })
  }

  getOrderDetails(orderId?: number | null): void {
    const order: Order = new Order();
    order.id = orderId;
  
    this.orderService.getOrderDetails(order).subscribe((res: OrderDetail[]) => {
      this.orderDetails = [];
  
      res.forEach((detail: OrderDetail) => {
        
        const matchedBook = this.books.find((book) => book.id === detail.bookId);
        
        this.orderDetails.push({
          ...detail,
          name: matchedBook?.name || 'Unknown', 
          author: matchedBook?.author || 'Unknown', 
        });
      });
  
      console.log(this.orderDetails);
    });
  }

  showDialog():void {
      this.visible = true;
  }

  saveBook(): void {
    if (this.formControl.valid) {
      const newBook: Book = {
        name: this.formControl.value.name,
        price: this.formControl.value.price,
        author: this.formControl.value.author,
        quantity: this.formControl.value.quantity,
      };

    
      this.bookService.addBook(newBook).subscribe({
        next: (response) => {
          console.log('Book added successfully:', response);
          this.visible = false;
          this.formControl.reset(); 
        },
        error: (error) => {
          console.error('Failed to add book:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }


  increaseQuantity(): void {
    let currentQuantity = this.formControl.get('quantity')?.value || 0;
    this.formControl.patchValue({ quantity: currentQuantity + 1 });
  }

  decreaseQuantity(): void {
    let currentQuantity = this.formControl.get('quantity')?.value || 0;
    if (currentQuantity > 1) {
      this.formControl.patchValue({ quantity: currentQuantity - 1 });
    }
  }
}
