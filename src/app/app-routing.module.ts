import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const appRoutes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full'}, //pathMatch: 'full', otherwise it redirects avery route, since all of them start with '/'
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) }, //the load children asks: please, only load RecipesModule when the path recipes is accessed
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
    { path: '**', redirectTo:'recipes'}

];

@NgModule({  //this makes the ordinary class a "module"
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}) 
    ],
    exports: [RouterModule] //export the configured RouterModule
})

export class AppRoutingModule {
    
}