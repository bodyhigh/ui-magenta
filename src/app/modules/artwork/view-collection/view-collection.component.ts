import { OnInit, AfterViewInit, OnDestroy, Component, ViewChild, ElementRef } from '@angular/core';
import { ArtworkService } from 'src/app/models/artwork.service';
import { IArtworkCollectionItem } from '../interfaces/iartwork-collection-item';
import {merge, of as observableOf, fromEvent, Observable, Subscription} from 'rxjs';
import {catchError, map, startWith, switchMap, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ArtworkDeleteDialogComponent } from '../artwork-delete-dialog/artwork-delete-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatPaginator, MatSort, MatInput } from '@angular/material';

@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.scss']
})
export class ViewCollectionComponent implements AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private searchFilter$: Observable<any>;
  public displayedColumns: string[] = ['title', 'description', 'actions'];
  public artworkCollection: IArtworkCollectionItem[] = [];
  public totalResultsCount: number = 0;
  public itemsPerPage: number = 4;
  public isLoadingResults = true;
  public snackRef: MatSnackBarRef<SimpleSnackBar>;

  @ViewChild('searchFilter', { static: false }) searchFilter: ElementRef;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

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

  ngAfterViewInit(): void {
    this.subscription.add(
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0)
    );

    this.searchFilter$ = fromEvent(this.searchFilter.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          console.log(event.target.value);
          return event.target.value;
        }), debounceTime(1000), distinctUntilChanged()
      );

    this.subscription.add(
      this.searchFilter$.subscribe(() => this.paginator.pageIndex = 0)
    );

    // Load Data
    this.loadCollection();
  }

  loadCollection(): void {
    this.subscription.add(
      merge(this.sort.sortChange, this.paginator.page, this.searchFilter$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          
          return this.artworkService.list(this.itemsPerPage,
                                          this.paginator.pageIndex,
                                          this.sort.active,
                                          this.sort.direction,
                                          this.sanitizeString(this.searchFilter.nativeElement.value));
        }),
        map(results => {
          this.isLoadingResults = false;
          this.totalResultsCount = results.totalCount;  
          return <IArtworkCollectionItem[]>results.data;
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

  sanitizeString(dirty: string): string {
    return dirty.trim().toLowerCase();
  }

};