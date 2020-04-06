import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping';
  showRecipes: boolean = true;
  showShoppingList: boolean = false;

  onRecipesClicked() {
    console.log('recipes clicked');
    this.showRecipes = true;
    this.showShoppingList = false;
  }

  onShoppingListClicked() {
    console.log('shopping clicked');
    this.showRecipes = false;
    this.showShoppingList = true;
  }

}
