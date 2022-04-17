import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

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
      case 'EMAIL_EXISTS':
        return 'Email exists';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }
}
