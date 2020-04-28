import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full'} //pathMatch: 'full', otherwise it redirects avery route, since all of them start with '/'
];

@NgModule({  //this makes the ordinary class a "module"
    imports: [
        RouterModule.forRoot(appRoutes) 
    ],
    exports: [RouterModule] //export the configured RouterModule
})

export class AppRoutingModule {
    
}