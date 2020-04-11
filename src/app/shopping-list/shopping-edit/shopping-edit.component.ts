import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: true}) nameInput: ElementRef; //ngModel would be a good option, but stores every keystroke inside the input element
  @ViewChild('amountInput', {static: true}) amountInput: ElementRef;

  constructor(private shoppigListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAdd() {
    const ingName = this.nameInput.nativeElement.value;
    const ingAmount = this.amountInput.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    console.log(newIngredient);
    this.shoppigListService.addNewIngredient(newIngredient);
    
  }


}
