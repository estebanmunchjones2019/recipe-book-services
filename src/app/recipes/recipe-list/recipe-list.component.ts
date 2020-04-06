import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Lomito', 'Impresionante lomito al asador', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe('Empanadas', 'Empanaditas hechas al horno', 'https://cdn.pixabay.com/photo/2017/04/29/00/42/empanadas-2269803_960_720.jpg'),
  ];
  @Output() recipeClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeClick(event, recipe) {
    event.preventDefault();
    this.recipeClicked.emit(recipe);
    console.log('onRecipeClick', recipe.name);
  }

}
