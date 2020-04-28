import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

//this core.module is used when there are services declared in the providers array in the appModule

@NgModule({
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}], 
})
export class CoreModule { }
