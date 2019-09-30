import { Component, AfterViewInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/models/user.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatPaginator, MatSort, MatInput } from '@angular/material';
import { IUser } from 'src/app/models/interfaces/iuser';
import {merge, of as observableOf, fromEvent, Observable} from 'rxjs';
import {catchError, map, startWith, switchMap, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  private snackRef: MatSnackBarRef<SimpleSnackBar>;

  public displayedColumns: string[] = ['firstName', 'lastName', 'email', 'accountStatus'];
  public data: IUser[] = [];
  public resultsLength = 0;
  public isLoadingResults = true;
  // public isRateLimitReached = false;
  public itemsPerPage = 4;
  private $searchFilter: Observable<any>;
  // private searchTerm: string = "";
  // private searchTermEmitter: EventEmitter<string> = new EventEmitter<string>();

  // @ViewChild(MatInput, { static: false }) searchFilter: MatInput;
  @ViewChild("searchFilter", { static: false }) searchFilter: ElementRef;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private userService: UserService,
              private sanitizer: DomSanitizer,
              private snackBar: MatSnackBar) { }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    
    this.$searchFilter = fromEvent(this.searchFilter.nativeElement, "keyup")
      .pipe(
        map((event: any) => {
          return event.target.value;
        })
        // ,filter(res => res.length > 2)
        ,debounceTime(1000)
        ,distinctUntilChanged()
      );

    this.$searchFilter.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, this.$searchFilter)
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
        catchError(() => {
          this.isLoadingResults = false;
          // this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  sanitizeString(dirty: string): string {
    return dirty.trim().toLowerCase();
  }
}
