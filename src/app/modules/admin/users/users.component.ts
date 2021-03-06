import { Component, AfterViewInit, ViewChild, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/models/user.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatPaginator, MatSort, MatInput } from '@angular/material';
import { IUser } from 'src/app/models/interfaces/iuser';
import {merge, of as observableOf, fromEvent, Observable, Subscription} from 'rxjs';
import {catchError, map, startWith, switchMap, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit, OnDestroy {
  private snackRef: MatSnackBarRef<SimpleSnackBar>;
  private searchFilter$: Observable<any>;
  private subscription: Subscription = new Subscription();
  public displayedColumns: string[] = ['firstName', 'lastName', 'email', 'accountStatus', 'actions'];
  public data: IUser[] = [];
  public resultsLength = 0;
  public isLoadingResults = true;
  public itemsPerPage = 4;

  @ViewChild('searchFilter', { static: false }) searchFilter: ElementRef;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private userService: UserService,
              private sanitizer: DomSanitizer,
              private snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) { }

  // TODO: need to unsubscribe to all subscriptions here
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.subscription.add(this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0));

    this.searchFilter$ = fromEvent(this.searchFilter.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        })
        , debounceTime(1000)
        , distinctUntilChanged()
      );

    this.subscription.add(this.searchFilter$.subscribe(() => this.paginator.pageIndex = 0));

    this.subscription.add(
      merge(this.sort.sortChange, this.paginator.page, this.searchFilter$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.userService.list(this.itemsPerPage,
                                       this.paginator.pageIndex,
                                       this.sort.active,
                                       this.sort.direction,
                                       this.sanitizeString(this.searchFilter.nativeElement.value));
        }),
        map(results => {
          results = JSON.parse(results);
          // Flip flag to show that loading has finished
          this.isLoadingResults = false;
          // this.isRateLimitReached = false;
          this.resultsLength = results.totalCount;
          return results.data;
        }),
        catchError((err) => {
          this.isLoadingResults = false;
          this.snackRef = this.snackBar.open(err.message, 'Close');
          // this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data)
    );

    // merge(this.sort.sortChange, this.paginator.page, this.searchFilter$)
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       this.isLoadingResults = true;
    //       return this.userService.list(this.itemsPerPage,
    //                                    this.paginator.pageIndex,
    //                                    this.sort.active,
    //                                    this.sort.direction,
    //                                    this.sanitizeString(this.searchFilter.nativeElement.value));
    //     }),
    //     map(results => {
    //       results = JSON.parse(results);
    //       // Flip flag to show that loading has finished
    //       this.isLoadingResults = false;
    //       // this.isRateLimitReached = false;
    //       this.resultsLength = results.totalCount;
    //       return results.data;
    //     }),
    //     catchError((err) => {
    //       this.isLoadingResults = false;
    //       this.snackRef = this.snackBar.open(err.message, 'Close');
    //       // this.isRateLimitReached = true;
    //       return observableOf([]);
    //     })
    //   ).subscribe(data => this.data = data);
  }

  sanitizeString(dirty: string): string {
    return dirty.trim().toLowerCase();
  }

  editUserClick(id: string) {
    this.router.navigate(['../user-edit', id], { relativeTo: this.route });
  }
}
