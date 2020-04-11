import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private shoppingListService: ShoppingListService,
              private recipesService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.id = +params['id'];
        this.recipe = this.recipesService.getRecipe(this.id);
    })
  }

  addIngredients(){
      this.shoppingListService.addNewIngredients(this.recipe.ingredients);
  }

  // onEditButtonClick() { the programatically way of navigating, insted id routerLink.
  //   this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route} );
  // or this.router.nabigate(['edit'], {relativeTo: this.route} )
  // }
    
}
