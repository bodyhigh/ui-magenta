import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/models/user.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatPaginator, MatSort } from '@angular/material';
import { IUser } from 'src/app/models/interfaces/iuser';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  private snackRef: MatSnackBarRef<SimpleSnackBar>;

  public displayedColumns: string[] = ['firstName', 'lastName'];
  public data: IUser[] = [];
  public resultsLength = 0;
  public isLoadingResults = true;
  public isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private userService: UserService,
              private snackBar: MatSnackBar) { }

  ngAfterViewInit(): void {
    // this.userService
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.userService.list();
        }),
        map(data => {
          // Flip flag to show that loading has finished
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.length;          
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }
}
