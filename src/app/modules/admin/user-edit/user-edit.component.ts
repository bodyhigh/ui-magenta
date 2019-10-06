import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { UserService } from 'src/app/models/user.service';
import { IUser } from 'src/app/models/interfaces/iuser';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  // public subscriptions: Subscription[] = [];
  private unsubscribe$ = new Subject<void>();
  private userId: string;
  private userData: IUser;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');

    this.userService.getById(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        res => {
          console.log(`res:`, res);
        },
        err => {
          console.log(`res:`, err);
        }
    );

    console.log(`UserId: ${this.userId}`);
  }

}
