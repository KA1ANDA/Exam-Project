import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-pop-up',
  standalone: false,
  
  templateUrl: './dialog-pop-up.component.html',
  styleUrl: './dialog-pop-up.component.css'
})
export class DialogPopUpComponent {
  @Input() visible: boolean = false;
  @Input() formGroup!: FormGroup;

  @Output() onSave = new EventEmitter<void>();
  @Output() onIncrease = new EventEmitter<void>();
  @Output() onDecrease = new EventEmitter<void>();


  save(): void {
    this.onSave.emit();
  }

  increase(): void {
    this.onIncrease.emit();
  }

  decrease(): void {
    this.onDecrease.emit();
  }
}
