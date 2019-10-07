import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { UserService } from 'src/app/models/user.service';
import { IUser } from 'src/app/models/interfaces/iuser';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { CustomValidatorService } from 'src/app/services/custom-validator.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

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
    email: ''
  };

  constructor(private userService: UserService,
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
    console.log(this.userData);
    
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.fb.group({
      firstName: [this.userData.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: [this.userData.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: [this.userData.email, [Validators.required, Validators.email]]
    });

    this.formGroup.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(item => {
        this.formErrors = this.formValidation.validateForm(this.formGroup, this.formErrors, true);
      }
    );
  }

  submitClick() {
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
  }

  roleChecked(role: string): boolean {
    return this.userData.roles.indexOf(role.toLowerCase()) != -1;
  }

  roleChanged(role: string) {
    role = role.toLowerCase();
    
    if (this.roleChecked(role)) {
      this.userData.roles.splice(this.userData.roles.indexOf(role), 1);
    } else {
      this.userData.roles.push(role);
    }
  }
}
