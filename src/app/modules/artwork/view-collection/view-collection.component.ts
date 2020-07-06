import { OnInit, AfterViewInit, OnDestroy, Component } from '@angular/core';
import { ArtworkService } from 'src/app/models/artwork.service';
import { IArtworkCollectionItem } from '../interfaces/iartwork-collection-item';
import {merge, of as observableOf, fromEvent, Observable, Subscription} from 'rxjs';
import {catchError, map, startWith, switchMap, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ArtworkDeleteDialogComponent } from '../artwork-delete-dialog/artwork-delete-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.scss']
})
export class ViewCollectionComponent implements AfterViewInit, OnDestroy, OnInit {
  private subscription: Subscription = new Subscription();
  public artworkCollection: IArtworkCollectionItem[] = [];
  public isLoadingResults = true;
  public snackRef: MatSnackBarRef<SimpleSnackBar>;

  constructor(
    private artworkService: ArtworkService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.snackRef !== undefined) { this.snackRef.dismiss(); }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadCollection();
  }

  loadCollection(): void {
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
          return <IArtworkCollectionItem[]>results;
        }),
        catchError(err => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe(data => {
        this.artworkCollection = data;
      })
    );
  }

  edit(artworkItem: IArtworkCollectionItem): void {
    this.router.navigate(['../art-edit/', artworkItem._id], { relativeTo: this.route });
  }

  delete(artworkItem: IArtworkCollectionItem) {
    const dialogRef = this.dialog.open(ArtworkDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.artworkService.delete(artworkItem._id)
          .subscribe(
            (res:any) => {
              this.loadCollection();
            },
            (err: HttpErrorResponse) => {
              this.snackRef = this.snackBar.open(err.message);
            }
          );
      }      
    });
  }

}

@Component({
  selector: 'delete-dialog',
  templateUrl: '../artwork-delete-dialog/artwork-delete-dialog.component.html'
})
export class DeleteDialog {}