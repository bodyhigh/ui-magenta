import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

let jwtHelper: JwtHelperService;

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => { return ''; }
          }
        })
      ],
      providers: [ JwtHelperService ]
    });

    jwtHelper = TestBed.get(JwtHelperService);
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
