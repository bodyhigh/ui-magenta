import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IUser } from './interfaces/iuser';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<IUser> {

  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IUser> {
    const userId = route.paramMap.get('userId');
    return this.userService.getById(userId);
  }
}