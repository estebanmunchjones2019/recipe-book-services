import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') seForm: NgForm;
  startedEditingSub: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppigListService: ShoppingListService) { }

  ngOnInit() {
    this.startedEditingSub = this.shoppigListService.startedEditing
      .subscribe(
        (i: number) => {
          this.editMode = true;
          this.editedItemIndex = i;
          this.editedItem = this.shoppigListService.getIngredient(i);
          this.seForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
    })
  }

  onSubmit(f: NgForm) {
    const value = f.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppigListService.updateIngredient(newIngredient, this.editedItemIndex)
    } else {
      this.shoppigListService.addNewIngredient(newIngredient);
    }
    f.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppigListService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }
 
  onClear() {
    this.seForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.startedEditingSub.unsubscribe();
  }

}
