import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IRegistrationFormData, ILoginFormData } from '../interfaces/auth';
import { ITokenUser } from '../modules/auth/interfaces/itoken-user';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private restApiEndpoint: string;
  private jwtTokenName: string;
  private jwtToken: string;
  private localStorageUserKey: string;
  private tokenUser: ITokenUser;

  constructor(private httpClient: HttpClient, 
    private jwtHelper: JwtHelperService, 
    private logger: LoggerService) { 
    this.restApiEndpoint = `${environment.restApiEndpoint}/auth`;
    this.jwtTokenName = environment.jwtTokenKey;
    this.localStorageUserKey = environment.localStorageUserKey;
    this.jwtToken = localStorage.getItem(this.jwtTokenName);
    this.tokenUser = JSON.parse(localStorage.getItem(this.localStorageUserKey));
  }

  register(formData: IRegistrationFormData): Observable<any> {
    const endpoint = `${this.restApiEndpoint}/register`;
    return this.httpClient.post<any>(endpoint, formData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.logger.log(error, 'AuthService.register');
          return throwError(error);
        })
      )
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
          return throwError(err.error.message)
        })
      )
  }

  logout(): void {
    localStorage.removeItem(this.jwtTokenName);
    localStorage.removeItem(environment.localStorageUserKey);
  }

  public isLoggedIn() {
    return this.jwtToken && !this.jwtHelper.isTokenExpired();
  }

  public isInRole(roleName: string): boolean {
    if (!this.isLoggedIn()) return false;
    
    return this.tokenUser.roles.some((role) => role.toLowerCase() == roleName.toLowerCase());
  }

  public isAdminRole(): boolean {
    return this.isInRole('admin');
  }

  public isUserRole(): boolean {
    return this.isInRole('user');
  }
}
