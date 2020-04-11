import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [ // private prevent recipes to be accessed from outside
    new Recipe(
      'Lomito',
      'Impresionante lomito al asador',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Onion', 5),
        new Ingredient('Red pepper', 2)
      ]
      ),
    new Recipe(
      'Empanadas',
      'Empanaditas hechas al horno',
      'https://cdn.pixabay.com/photo/2017/04/29/00/42/empanadas-2269803_960_720.jpg',
      [
        new Ingredient('Meat', 2),
        new Ingredient('Onion', 1),
        new Ingredient('Red pepper', 2),
        new Ingredient('flour', 3),
      ]
        ),
  ];
  // recipeClicked = new EventEmitter<Recipe>();
  // private recipe: Recipe;

  getRecipes() {
    return [...this.recipes]; // or this.recipes.slice(), to not return just the pointer
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }


  // onRecipeClicked(recipe) {
  //   this.recipeClicked.emit(recipe);
  // }

  constructor() { }
}
