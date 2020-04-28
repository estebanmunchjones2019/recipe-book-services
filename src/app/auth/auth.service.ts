import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: string 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null); // the subcriber can subscribe later, upon fetch recipes, and still get the latest user, even when the subject called next when the user logged in a few minutes before
  // I could have a token variable in this class which updates upon user emmitions, and can be accessed by dataStorageService, another approach
  api_key: string = 'AIzaSyA_ho2nIeZ_0AnAO1tmB0XATrTZOC7RlWU';
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.api_key}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError), tap(res => {// this.handleError is the callback function, the catchError operator has an HttpErroResponse as argument;
          this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn)// the tap operator has the AuthResponseData object as argument
      }))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.api_key}`,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(res => {
      this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn)
      }))
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));//convert the string into an object
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']); // I redirect here, in the service, because I can logout from multipe components
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = 'An unknown error occurred';
        
    if (!error.error || !error.error.error) {
      return throwError(errorMessage);
    } else {
      switch(error.error.error.message){
        case 'EMAIL_EXISTS' :
          errorMessage = 'The email address is already in use by another account.';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled for this project.';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'The password is invalid or the user does not have a password.';
          break;
        case 'USER_DISABLED':
          errorMessage = 'The user account has been disabled by an administrator.';
          break; //giving too much detail about the error to the user can have security drawbacks, but it's done here for the sake of practicing
      }
      return throwError(errorMessage);
    }
  }

  private handleAuthentication(
    email: string,
    id: string, 
    token: string, 
    expiresIn: number
    ) {
    const tokenExpirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, id, token, tokenExpirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user)); //I lost the getter token method inside user when converted to a string
  }
}

  

