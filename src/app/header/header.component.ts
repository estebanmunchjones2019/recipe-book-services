import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() recipesClicked = new EventEmitter<string>();
  @Output() shoppingListClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onRecipesClick() {
    this.recipesClicked.emit();
  }

  onShoppingListClick() {
    console.log('emiting shopping');
    this.shoppingListClicked.emit();
  }

}
