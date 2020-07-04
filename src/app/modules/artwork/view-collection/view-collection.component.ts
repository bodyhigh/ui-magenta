import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ArtworkService } from 'src/app/models/artwork.service';
import { IArtworkCollectionItem } from '../interfaces/iartwork-collection-item';
import {merge, of as observableOf, fromEvent, Observable, Subscription} from 'rxjs';
import {catchError, map, startWith, switchMap, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

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
    private artworkService: ArtworkService,
    private router: Router,
    private route: ActivatedRoute
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
        // console.log(this.artworkCollection);
      })
    );
    
  }

  edit(artworkItem: IArtworkCollectionItem): void {
    // console.log(artworkItem);
    this.router.navigate(['../art-edit/', artworkItem._id], { relativeTo: this.route });
  }

}
