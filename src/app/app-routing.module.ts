import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full'}, //pathMatch: 'full', otherwise it redirects avery route, since all of them start with '/'
    { path: 'recipes', 
    component: RecipesComponent, 
    children: [
        {path: '', component: RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent},
        {path: ':id/edit', component: RecipeEditComponent}
    ]},
    { path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({  //this makes the ordinary class a "module"
    imports: [
        RouterModule.forRoot(appRoutes) 
    ],
    exports: [RouterModule] //export the configured RouterModule
})

export class AppRoutingModule {
    
}