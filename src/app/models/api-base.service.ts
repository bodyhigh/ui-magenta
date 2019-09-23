import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoggerService } from '../services/logger.service';
import { ITokenUser } from '../modules/auth/interfaces';
import { environment } from 'src/environments/environment';

/**
 * Base class for model services, will provide most of the plumbing
 * to get started with making calls to the REST API
 *
 * @export
 * @class ApiBaseServiceService
 */
@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {
  protected httpClient: HttpClient;
  protected jwtHelper: JwtHelperService;
  protected logger: LoggerService;

  protected restApiEndpoint: string;
  protected jwtTokenName: string;
  protected jwtToken: string;
  protected localStorageUserKey: string;
  protected tokenUser: ITokenUser;
  
  constructor(injector: Injector) {
    this.httpClient = injector.get(HttpClient);
    this.jwtHelper = injector.get(JwtHelperService);
    this.logger = injector.get(LoggerService);
    this.jwtTokenName = environment.jwtTokenKey;
    this.localStorageUserKey = environment.localStorageUserKey;
    this.jwtToken = localStorage.getItem(this.jwtTokenName);
    this.tokenUser = JSON.parse(localStorage.getItem(this.localStorageUserKey));
  }
}
