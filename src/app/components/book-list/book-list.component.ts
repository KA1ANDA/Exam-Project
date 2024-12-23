import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: false,
  
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
    selectedBookId: number | null = null; 
    visible: boolean = false;
    books : Book[] = []
  
    constructor(public fb:FormBuilder , public bookService:BooksService){}
  
    formControl = this.fb.group({
      name: ["", Validators.required],
      price: [0, Validators.required],
      author: ["", Validators.required],
      quantity: [1, Validators.required],
    });

  ngOnInit(): void {
    this.getBooks()

  }


  showDialog(book:Book) {
    if (book) {
      // Set the form values with the selected book's data
      this.formControl.patchValue({
        name: book.name,
        price: book.price,
        author: book.author,
        quantity: book.quantity
      });
      this.selectedBookId = book.id ?? null;
    }
    this.visible = true;
  }

  getBooks(){
    this.bookService.getBooks().subscribe(res=>{
      this.books = res
      console.log(res)
    })
  }


  updateBook(): void {
    if (this.formControl.valid && this.selectedBookId !== null) {
      const updatedBook: Book = {
        id: this.selectedBookId,  
        name: this.formControl.value.name,
        price: this.formControl.value.price,
        author: this.formControl.value.author,
        quantity: this.formControl.value.quantity,
      };

      this.bookService.updateBook(updatedBook).subscribe({
        next: (response) => {
          console.log('Book updated successfully:', response);
          this.visible = false;
          this.formControl.reset();
        },
        error: (error) => {
          console.error('Failed to update book:', error);
        }
      });
    } else {
      console.log('Form is invalid or book ID is missing');
    }
  }

  
}
