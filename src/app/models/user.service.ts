import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IUser, objToIUserMapper } from './interfaces/iuser';
import { ApiBaseService } from './api-base.service';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { IUserEdit } from '../modules/admin/interfaces/iuseredit';

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
export class UserService extends ApiBaseService {

  constructor(injector: Injector) {
    super(injector);
    this.restApiEndpoint = `${environment.restApiEndpoint}/user`;
  }

  list(itemsPerPage: number = 0,
       pageNumber: number = 25,
       sortFieldName = 'lastName',
       sortDirection: string = 'asc',
       searchTerm: string): Observable<any> {
    const endpoint = `${this.restApiEndpoint}/`;
    const params = new HttpParams()
      .set('itemsPerPage', itemsPerPage.toString())
      .set('pageNumber', pageNumber.toString())
      .set('sortFieldName', sortFieldName)
      .set('sortDirection', sortDirection)
      .set('searchTerm', searchTerm);
    return this.httpClient.get<any>(endpoint, { params });
  }

  getById(id: string): Observable<IUser> {
    const endpoint = `${this.restApiEndpoint}/${id}`;
    return this.httpClient.get<IUser>(endpoint)
      .pipe(
        map(user => objToIUserMapper(user))
        // map(user => {
        //   return this.userMapper(user);
        // })
      );
  }

  updateUserEdit(userData: IUserEdit): Observable<any> {
    const endpoint = `${this.restApiEndpoint}/userProfile/${userData.id}`;
    console.log("sending userData: ");
    console.log(userData);
    
    
    return this.httpClient.patch(endpoint, userData);
  }
}
