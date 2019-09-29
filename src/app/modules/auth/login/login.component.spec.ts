// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing'

// import { LoginComponent } from './login.component';
// import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
// import { CommonMaterialsModule } from '../../common-materials/common-materials.module';
// import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
// import { ActivatedRoute } from '@angular/router';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let jwtHelper: JwtHelperService;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         ReactiveFormsModule, 
//         CommonMaterialsModule,
//         HttpClientTestingModule,
//         JwtModule.forRoot({
//           config: {
//             tokenGetter: () => { return ''; }
//           }
//         })
//       ],
//       declarations: [ LoginComponent ],
//       providers: [
//         AuthService,
//         JwtHelperService,
//         ActivatedRoute,
//         FormBuilder
//       ]
//     })
//     .compileComponents();
//     jwtHelper = TestBed.get(JwtHelperService);
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
