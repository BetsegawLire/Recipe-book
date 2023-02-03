import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f', {static: false }) slForm: NgForm;

//  @ViewChild('nameInput') nameInputref: ElementRef;
//  @ViewChild('amountInput') amountInputref: ElementRef;

//  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  onAddItem(form: NgForm): void {
    // const ingName = this.nameInputref.nativeElement.value;
    // const ingAmount = this.amountInputref.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    // this.ingredientAdded.emit(newIngredient);
    // input.value = '';
    // input2.value = '';
    if(this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
    
  }

  // onClear(input:HTMLInputElement, input2:HTMLInputElement) {
  //   input.value = '';
  //   input2.value = '';
  // }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
    
  }
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  // ngAfterViewInit() {
  //   this.nameInputref.nativeElement.focus();
  // }
}
