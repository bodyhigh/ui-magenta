import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/models/user.service';
import { IUser } from 'src/app/models/interfaces/iuser';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  public subscriptions: Subscription[] = [];
  private userId: string;
  private userData: IUser;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("userId");
    
    this.subscriptions.push(
      this.userService.getById(this.userId)
      .subscribe(
        res => {
          console.log(`res: ${JSON.stringify(res)}`);
        },
        err => {
          console.log(`res: ${err}`);
        }
      )
    );

    // this.route.paramMap.subscribe(params => {
    //   this.userId = params.get("userId");
    //   return this.userService.getById(this.userId);
    // })
    
    console.log(`UserId: ${this.userId}`);
  }

}
