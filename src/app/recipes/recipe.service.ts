import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [] // private prevent recipes to be accessed from outside

  recipeChanged = new Subject<Recipe[]>();
  // recipeClicked = new EventEmitter<Recipe>();
  // private recipe: Recipe;

  constructor(){}

  setRecipes(recipes: Recipe[]) {
    console.log(recipes);
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return [...this.recipes.slice()]; // or this.recipes.slice(), to not return just the pointer
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) { 
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(i: number, recipe: Recipe) {
    this.recipes[i] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(i: number) {
    this.recipes.splice(i, 1);
    this.recipeChanged.next(this.recipes.slice());
  }


  // onRecipeClicked(recipe) {
  //   this.recipeClicked.emit(recipe);
  // }

}
