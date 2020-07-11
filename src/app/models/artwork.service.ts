import { Injectable, Injector } from '@angular/core';
import { ApiBaseService } from './api-base.service';
import { environment } from 'src/environments/environment';
import { IArtCreate } from '../modules/artwork/interfaces/iartcreate';
import { Observable, throwError } from 'rxjs';
import { IArtworkCollectionItem } from '../modules/artwork/interfaces/iartwork-collection-item';
import { IArtworkEdit } from '../modules/artwork/interfaces/iartwork-edit';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';

/**
 *
 *
 * @export
 * @class ArtworkService
 * @extends {ApiBaseService}
 */
@Injectable({
  providedIn: 'root'
})
export class ArtworkService extends ApiBaseService {

  constructor(injector: Injector) {
    super(injector);
    this.restApiEndpoint = `${environment.restApiEndpoint}/artwork`;
  }

  create(artRecord: IArtCreate): Observable<any> {
    const endpoint = `${this.restApiEndpoint}`;
    return this.httpClient.post(endpoint, artRecord);
  }

  getAllByArtist(): Observable<IArtworkCollectionItem[]> {
    return this.httpClient.get<IArtworkCollectionItem[]>(this.restApiEndpoint);
  }

  getById(id): Observable<IArtworkEdit> {
    return this.httpClient.get<IArtworkEdit>(`${this.restApiEndpoint}/${id}`);
  }

  update(artRecord: IArtworkEdit): Observable<IArtworkEdit> {
    const endpoint = `${this.restApiEndpoint}/${artRecord._id}`;
    return this.httpClient.patch<IArtworkEdit>(endpoint, artRecord);
  }

  delete(artworkId: string): Observable<any> {
    const endpoint = `${this.restApiEndpoint}/${artworkId}`;
    return this.httpClient.delete<any>(endpoint)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  list( itemsPerPage: number = 25,
        pageNumber: number = 0,
        sortFieldName: string = 'title',
        sortDirection: string = 'asc',
        searchTerm: string
        ): Observable<any> {
          const params = new HttpParams()
            .set('itemsPerPage', itemsPerPage.toString())
            .set('pageNumber', pageNumber.toString())
            .set('sortFieldName', sortFieldName)
            .set('sortDirection', sortDirection)
            .set('searchTerm', searchTerm)

          return this.httpClient.get<any>(this.restApiEndpoint, { params });
        }
}
