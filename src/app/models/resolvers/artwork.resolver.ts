import { Injectable } from "@angular/core";
import { IArtworkEdit } from 'src/app/modules/artwork/interfaces/iartwork-edit';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ArtworkService } from '../artwork.service';

@Injectable({
    providedIn: 'root'
})
export class ArtResolver implements Resolve<IArtworkEdit> {
    constructor(
        private artworkService: ArtworkService
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IArtworkEdit | import("rxjs").Observable<IArtworkEdit> | Promise<IArtworkEdit> {
        const id = route.paramMap.get('id');
        return this.artworkService.getById(id);
    }
}