import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ArtService } from 'src/app/models/art.service';
import { IArtworkCollectionItem } from '../interfaces/iartwork-collection-item';
import {merge, of as observableOf, fromEvent, Observable, Subscription} from 'rxjs';
import {catchError, map, startWith, switchMap, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.scss']
})
export class ViewCollectionComponent implements AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public artworkCollection: IArtworkCollectionItem[] = [];
  public isLoadingResults = true;

  constructor(
    private artworkService: ArtService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.subscription.add(
      merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.artworkService.getAllByArtist();
        }),
        map(results => {
          this.isLoadingResults = false;
          // console.log(`map results ${results}`);
          return <IArtworkCollectionItem[]>results;
        }),
        catchError(err => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe(data => {
        this.artworkCollection = data
        console.log(this.artworkCollection);
      })
    );
    
  }

  edit(artworkItem: IArtworkCollectionItem): void {
    console.log(artworkItem);
  }

}
