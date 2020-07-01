import { Injectable, Injector } from '@angular/core';
import { ApiBaseService } from './api-base.service';
import { environment } from 'src/environments/environment';
import { IArtCreate } from '../modules/art/iartcreate';
import { Observable } from 'rxjs';

/**
 *
 *
 * @export
 * @class ArtService
 * @extends {ApiBaseService}
 */
@Injectable({
  providedIn: 'root'
})
export class ArtService extends ApiBaseService {

  constructor(injector: Injector) {
    super(injector);
    this.restApiEndpoint = `${environment.restApiEndpoint}/artwork`;
  }

  create(artRecord: IArtCreate): Observable<any> {
    const endpoint = `${this.restApiEndpoint}`;
    return this.httpClient.post(endpoint, artRecord);
  }
}
