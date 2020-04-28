import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective; //viewchild will look for the first occurance of that directive in the DOM
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  private closeSub: Subscription;
  
  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onClose() {
    this.error = null;
  }

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    const email = authForm.value.email;
    const password = authForm.value.password;
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage; //setting the error globally was used with the dynamic component *ngIf approach
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
    })

    authForm.reset();
  }

  private showErrorAlert(errorMessage: string) {
    // const alertCmp = new AlertComponent(); this won't work because a component in agular is more than just an object, it has to be included in change detection, etc
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
   //alertCmpFactory is an object that knows how to create only AlertComponents
    const hostVcRef = this.alertHost.vsRef;
    hostVcRef.clear();//to clear everything that was previously renderer there;
    const componentRef = hostVcRef.createComponent(alertCmpFactory);
    componentRef.instance.message = errorMessage;
    this.closeSub = componentRef.instance.close.subscribe(() => { //
      this.closeSub.unsubscribe();
      hostVcRef.clear();
    })
  }

  ngOnDestroy() {
    if (this.closeSub) {
    this.closeSub.unsubscribe();
    }
  }
  
}
