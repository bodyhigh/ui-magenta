import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { UserService } from 'src/app/models/user.service';
import { IUser } from 'src/app/models/interfaces/iuser';
import { takeUntil, filter } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { CustomValidatorService } from 'src/app/services/custom-validator.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { IUserEdit } from '../interfaces/iuseredit';
import { HttpErrorResponse } from '@angular/common/http';

// interface ICheckboxItem {
//   id?: string;
//   selected: boolean;
//   name: string;
// }

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private userId: string;
  private userData: IUser;
  private snackRef: MatSnackBarRef<SimpleSnackBar>;
  public formGroup: FormGroup;
  public formErrors = {
    firstName: '',
    lastName: '',
    email: '',
    roles: '',
    accountStatus: ''
  };

  roles: string[] = ['Admin', 'User'];
  accountStatuses: string[] = ['Registered', 'Active', 'Disabled'];
  // accountStatusArray: Array<{ displayText: string, value: string }> = [
  //   { displayText: 'Registered', value: 'Registered'},
  //   { displayText: 'Active', value: 'Active'},
  //   { displayText: 'Disabled', value: 'Disabled'}
  // ];

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private formValidation: FormValidationService,
              private customValidator: CustomValidatorService,
              private snackbar: MatSnackBar) { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.userData = this.route.snapshot.data.user;
    this.buildForm();
    // this.roles = Object.keys(this.formGroup.controls.roles.value);
    console.log(this.userData);
    
  }

  buildForm() {
    this.formGroup = this.fb.group({
      firstName: [this.userData.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: [this.userData.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: [this.userData.email, [Validators.required, Validators.email]],
      roles: this.buildRolesGroup(),
      // roles: ['user'],
      accountStatus: [this.userData.accountStatus, Validators.required]
    });

    console.log(this.formGroup);

    this.formGroup.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(item => {
        this.formErrors = this.formValidation.validateForm(this.formGroup, this.formErrors, true);
      }
    );
  }

  buildRolesGroup(): FormGroup {
    
    return this.fb.group({
      Admin: this.userData.roles.includes('admin'),
      User: this.userData.roles.includes('user')
    });
  }

  buildAccountStatusGroup(): FormGroup {
      return this.fb.group({
        accountStatus: ['Active', Validators.required]
      });
  }

  getSelectedRoles(fgRoles: any) {
    return Object.keys(fgRoles).filter(key => fgRoles[key]).map(str => str.toLowerCase());
  }

  submitClick() {
    console.log('SUBMIT!!!');

    if (this.snackRef !== undefined) { this.snackRef.dismiss(); }
    this.formValidation.markFormGroupTouched(this.formGroup);

    if (!this.formGroup.valid) {      
      this.formValidation.validateForm(this.formGroup, this.formErrors, false);
    } else {      
      const formData: IUserEdit = {
        id: this.userData._id,
        firstName: this.formGroup.get('firstName').value,
        lastName: this.formGroup.get('lastName').value,
        email: this.formGroup.get('email').value,
        roles: this.getSelectedRoles(this.formGroup.get("roles").value),
        accountStatus: this.formGroup.get("accountStatus").value
      };

      // console.log(formData);
      
      // this.userService.getById(3);

      this.userService.updateUserEdit(formData)
      .subscribe(
          (res: any) => {
            this.snackRef = this.snackbar.open('Record Saved', 'Close');
            // console.log("Saved successfully");            
              // this.registrationConfirmed = true;
          },
          (err: HttpErrorResponse) => {
              // console.log(err);              
              const snackError = err.statusText.length != 0 ? err.statusText : err.error.errors.map(e => e.description).join('');
              this.snackRef = this.snackbar.open(snackError, 'Close');
          }
      );
      // this.subscriptions.push(this.authService.register(formData)
      // .subscribe(
      //     (res: IRegistrationFormData) => {
      //         this.registrationConfirmed = true;
      //     },
      //     (err: HttpErrorResponse) => {
      //         const snackError = err.error.errors.map(e => e.description).join('');
      //         this.snackRef = this.snackbar.open(snackError, 'Close');
      //     }
      // ));

    }

    console.log("end submit");
  }

  roleChecked(role: string): boolean {
    return this.userData.roles.indexOf(role.toLowerCase()) !== -1;
  }

  roleChanged(role: string) {
    role = role.toLowerCase();
    if (this.roleChecked(role)) {
      this.userData.roles.splice(this.userData.roles.indexOf(role), 1);
    } else {
      this.userData.roles.push(role);
    }
  }

  cancel() {
    //this.router.navigate(['/admin/users']);
    return this.router.navigate(['../../users'], { relativeTo: this.route });
  }
}
