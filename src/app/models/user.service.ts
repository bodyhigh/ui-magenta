import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUser } from './interfaces/iuser';
import { ApiBaseService } from './api-base.service';

/**
 * API Model for the User class
 *
 * @export
 * @class UserService
 * @extends {ApiBaseServiceService}
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiBaseService{

  constructor(injector: Injector) {
    super(injector);
    this.restApiEndpoint = `${environment.restApiEndpoint}/user`;
  }

  list(): Observable<IUser[]> {
    const endpoint = `${this.restApiEndpoint}/`;
    return this.httpClient.get<any>(endpoint, { });
  }
}
// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   constructor(private httpClient: HttpClient,
//               private jwtHelper: JwtHelperService,
//               private logger: LoggerService) { }
// }
