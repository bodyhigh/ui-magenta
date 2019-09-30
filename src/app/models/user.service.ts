import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUser } from './interfaces/iuser';
import { ApiBaseService } from './api-base.service';
import { HttpParams } from '@angular/common/http';

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

  list(itemsPerPage: number = 0, 
      pageNumber: number = 25, 
      sortFieldName = "lastName", 
      sortDirection: string = 'asc',
      searchTerm: string): Observable<any> {
    const endpoint = `${this.restApiEndpoint}/`;
    let params = new HttpParams()
      .set('itemsPerPage', itemsPerPage.toString())
      .set('pageNumber', pageNumber.toString())
      .set('sortFieldName', sortFieldName)
      .set('sortDirection', sortDirection)
      .set('searchTerm', searchTerm)
    return this.httpClient.get<any>(endpoint, { params: params });
  }
}
