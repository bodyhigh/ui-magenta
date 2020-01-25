import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { UserService } from 'src/app/models/user.service';
import { IUser } from 'src/app/models/interfaces/iuser';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { CustomValidatorService } from 'src/app/services/custom-validator.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

interface ICheckboxItem {
  id?: string;
  selected: boolean;
  name: string;
}

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
<<<<<<< HEAD
    accountStatuses: ''
  };
  private roles: string[] = ['admin', 'user'];
  private accountStatuses: string[] = ['registered', 'active', 'disabled'];
  
  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute, 
=======
    accountStatus: ''
  };

  roles: string[];
  // accountStatuses: string[] = ['Registered', 'Active', 'Disabled'];
  accountStatusArray: Array<{ displayText: string, value: string }> = [
    { displayText: 'Registered', value: 'Registered'},
    { displayText: 'Active', value: 'Active'},
    { displayText: 'Disabled', value: 'Disabled'}
  ];

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
>>>>>>> 2c8d3940ff1bcc01458b2c615c0238fbb37e0b35
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
    // console.log(this.userData);
    this.buildForm();
    this.roles = Object.keys(this.formGroup.controls.roles.value);
    // this.buildAccountStatusGroup();
  }

  buildRolesGroup(roles: string[]): FormArray {
    return this.fb.array(roles.map(role => {
      return this.fb.group({ id: role, name: role, selected: false });
      // return this.fb.control({ id: role, name: role, selected: false });
      // return new FormControl(false);
    }));
  }

  buildAccountStatusGroup(statuses: string[]): FormArray {
    return this.fb.array(statuses.map(status => {
      return this.fb.group({ id: status, name: status, selected: false });
    }));
  }

  buildForm() {
    this.formGroup = this.fb.group({
      firstName: [this.userData.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: [this.userData.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: [this.userData.email, [Validators.required, Validators.email]],
<<<<<<< HEAD
      // roles: [[], [Validators.required, Validators.minLength(1)]],
      roles: this.buildRolesGroup(this.roles),
      accountStatuses: this.buildAccountStatusGroup(this.accountStatuses)
      // accountStatus: [this.userData.accountStatus, [Validators.required]]
=======
      roles: this.buildRolesGroup(),
      // accountStatus: new FormArray([])
      accountStatus: ['', Validators.required]
>>>>>>> 2c8d3940ff1bcc01458b2c615c0238fbb37e0b35
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
      Admin: false,
      User: false
    });
  }

  buildAccountStatusGroup() {
    // const accountStatusFormArray: FormArray = new FormArray([]);
    // // this.accountStatuses.forEach((v, i) => {
    // this.accountStatusArray.forEach((v, i) => {
    //   const control = new FormControl(false);
    //   (this.formGroup.controls.accountStatus as FormArray).push(control);
    // });
  }

  //https://medium.com/@2bhere4u/angular-5-material-design-checkbox-array-reactive-forms-handle-3885dde366ca
  updateCheckbox(item, isChecked) {
    console.log(item);
    console.log(isChecked);
  }

  submitClick() {
<<<<<<< HEAD
    console.log("start submit");

=======
    console.log('SUBMIT!!!');
    console.log(this.formErrors);
    console.log(this.formGroup);
>>>>>>> 2c8d3940ff1bcc01458b2c615c0238fbb37e0b35
    if (this.snackRef !== undefined) { this.snackRef.dismiss(); }
    this.formValidation.markFormGroupTouched(this.formGroup);

    if (!this.formGroup.valid) {
      this.formValidation.validateForm(this.formGroup, this.formErrors, false);
    } else {
      const formData = {
        firstName: this.formGroup.get('firstName').value,
        lastName: this.formGroup.get('lastName').value,
        email: this.formGroup.get('email').value
      };

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
<<<<<<< HEAD
    // this.router.navigate(['../users'], { relativeTo: this.route });
    this.router.navigate(['/admin/users']);
=======
    return this.router.navigate(['../../users'], { relativeTo: this.route });
>>>>>>> 2c8d3940ff1bcc01458b2c615c0238fbb37e0b35
  }
}
