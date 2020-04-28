import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put<any>('https://ng-recipe-book-e0f27.firebaseio.com/recipes.json', recipes) //if I use post, I add new group of recipes. Put method overwrites them
    .subscribe(response => {
      console.log('post request succesful')
      console.log(response);
    })
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://ng-recipe-book-e0f27.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => { // I add an ingredients key for each Recipe I fetch, to keep the same shape in case I want to interact with the ingredients
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            } ;
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }

} 

//user Observable => pipe (return http Observable, map to return an array of recipes for the UI, and tap ) and I return this massive block, wich is an observable
