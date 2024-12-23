import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Book } from '../../models/book';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-manager-page',
  standalone: false,
  
  templateUrl: './manager-page.component.html',
  styleUrl: './manager-page.component.css'
})
export class ManagerPageComponent {
  visible: boolean = false;

  constructor(public fb:FormBuilder , public bookService:BooksService){}

  formControl = this.fb.group({
    name: ["", Validators.required],
    price: [0, Validators.required],
    author: ["", Validators.required],
    quantity: [1, Validators.required],
  });


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
