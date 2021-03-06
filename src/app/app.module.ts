import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

//there should't be any unused imports, because it's affects the bundle size

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // RecipesModule,
    // ShoppingListModule,
    // AuthModule,
    SharedModule,
    CoreModule
  ],
  // I use providedIn: 'root' inside every service
  //there are more services, but they were provided through providedIn('root') inside each service
  bootstrap: [AppComponent] //interceptors affect all http request, so I need some logic inside them to be selective
})
export class AppModule { } 
