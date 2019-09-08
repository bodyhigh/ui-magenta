import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormValidationService } from '../services/form-validation.service';
import { AuthService } from '../services/auth.service';
import { CustomValidatorService } from '../services/custom-validator.service';
import { Subscription } from 'rxjs';
import { IRegistrationFormData } from '../interfaces/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private registrationConfirmed: boolean = false;
  private registrationForm: FormGroup
  private snackRef: MatSnackBarRef<SimpleSnackBar>;
  private formErrors = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: ''
  };

  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formValidation: FormValidationService,
    private authService: AuthService,
    private customValidator: CustomValidatorService,
    private snackbar: MatSnackBar) { };

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.customValidator.passwordValidator()]],
      passwordConfirm: ['', Validators.required]
    }, { validator: this.customValidator.passwordMatcherValidator});

    this.subscriptions.push(this.registrationForm.valueChanges.subscribe(item => {
      this.formErrors = this.formValidation.validateForm(this.registrationForm, this.formErrors, true);
    }));
  }

  ngOnDestroy() {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  submit() {
    if (this.snackRef !== undefined) this.snackRef.dismiss();
    this.formValidation.markFormGroupTouched(this.registrationForm);

    if (!this.registrationForm.valid) {
      this.formValidation.validateForm(this.registrationForm, this.formErrors, false);
    } else {
      const formData: IRegistrationFormData = {
        firstName: this.registrationForm.get('firstName').value,
        lastName: this.registrationForm.get('lastName').value,
        email: this.registrationForm.get('email').value,
        password: this.registrationForm.get('password').value,
        passwordConfirm: this.registrationForm.get('passwordConfirm').value
      };

      this.subscriptions.push(this.authService.register(formData)
      .subscribe(
          (res: IRegistrationFormData) => {
              this.registrationConfirmed = true;
          },
          (err: HttpErrorResponse) => {
              const snackError = err.error.errors.map(e => e.description).join('');
              this.snackRef = this.snackbar.open(snackError, 'Close');
          }
      ));

    }
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute});
  }
}
