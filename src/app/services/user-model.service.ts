import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserModelService {
  private restApiEndpoint: string;

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) {
    this.restApiEndpoint = `${environment.restApiEndpoint}/user`;
  }

  // register(formData: RegistrationFormData): Observable<any> {
  //   const endpoint = `${environment.restApiEndpoint}/auth/register`;
  //   return this.httpClient.post<any>(endpoint, formData)
  //     .pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         return throwError(`Something bad happened: ${error}`);
  //       })
  //     )
  // }
}
