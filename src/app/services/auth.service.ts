import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { autoLogout } from '../auth/state/auth.actions';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any;

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(username: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>('https://127.0.0.1:8000/login', {
      username,
      password,
    });
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>('https://127.0.0.1:8000/signup', {
      email,
      password,
    });
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getDate() + +data.expiresIn * 1000
    );
    return new User(data.email, data.idToken, data.localId, expirationDate);
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'Invalid credentials.':
        return message;
      case 'EMAIL_NO_EXISTS':
        return 'Email not exists';
      case 'EMAIL_EXISTS':
        return 'Email exists';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const todayDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todayDate;

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout());
    }, timeInterval);
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate
      );
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = false;
    }
  }
}
