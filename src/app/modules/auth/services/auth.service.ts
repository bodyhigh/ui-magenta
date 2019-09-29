import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ILoginFormData, IRegistrationFormData } from '../interfaces/';
import { ApiBaseService } from 'src/app/models/api-base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiBaseService {
  constructor(injector: Injector) {
    super(injector);
    this.restApiEndpoint = `${environment.restApiEndpoint}/auth`;
  }

  register(formData: IRegistrationFormData): Observable<any> {
    const endpoint = `${this.restApiEndpoint}/register`;
    return this.httpClient.post<any>(endpoint, formData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.logger.log(error, 'AuthService.register');
          return throwError(error);
        })
      );
  }

  login(formData: ILoginFormData): Observable<any> {
    const endpoint = `${this.restApiEndpoint}/login`;
    return this.httpClient.post<any>(endpoint, formData)
      .pipe(
        tap(res => {
          if (res.token && res.success === true) {
            this.tokenUser = {
              firstName: res.firstName,
              lastName: res.lastName,
              roles: res.roles,
              token: res.token,
              userId: res.userId };

            this.jwtToken = this.tokenUser.token;
            localStorage.setItem(this.jwtTokenName, this.jwtToken);
            localStorage.setItem(this.localStorageUserKey, JSON.stringify(this.tokenUser));
          } else {
            this.logger.log(res, 'AuthService.login [tap]');
          }
        }),
        map(res => {
          return { loggedIn: res.success, message: res.message };
        }),
        catchError((err: HttpErrorResponse) => {
          this.logger.log(err, 'AuthService.login');
          return throwError(err.error.message);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.jwtTokenName);
    localStorage.removeItem(environment.localStorageUserKey);
  }

  public isLoggedIn() {
    return this.jwtToken && !this.jwtHelper.isTokenExpired();
  }

  public isInRole(roleName: string): boolean {
    if (!this.isLoggedIn()) {
      return false;
    }

    return this.tokenUser.roles.some((role) => role.toLowerCase() === roleName.toLowerCase());
  }

  public isAdminRole(): boolean {
    return this.isInRole('admin');
  }

  public isUserRole(): boolean {
    return this.isInRole('user');
  }
}
