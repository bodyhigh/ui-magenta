import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidatorService } from '../../../services/custom-validator.service';
import { FormValidationService } from '../../../services/form-validation.service';
import { Subscription } from 'rxjs';
import { ILoginFormData } from '../interfaces/';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public subscriptions: Subscription[] = [];
  private snackRef: MatSnackBarRef<SimpleSnackBar>;
  private returnUrl: string;
  public formErrors = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private customValidator: CustomValidatorService,
              private formValidation: FormValidationService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.customValidator.passwordValidator()]]
    });

    this.subscriptions.push(this.loginForm.valueChanges.subscribe(item => {
      this.formErrors = this.formValidation.validateForm(this.loginForm, this.formErrors, true);
    }));
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  submit() {
    if (this.snackRef !== undefined) { this.snackRef.dismiss(); }
    this.formValidation.markFormGroupTouched(this.loginForm);

    if (!this.loginForm.valid) {
      this.formValidation.validateForm(this.loginForm, this.formErrors, false);
    } else {
      const formData: ILoginFormData = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      };

      this.subscriptions.push(this.authService.login(formData)
        .subscribe(
          res => { this.router.navigate([this.returnUrl]); },
          err => { this.snackRef = this.snackBar.open(err, 'Close'); }
        ));
    }
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute});
  }

}
