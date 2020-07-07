import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { IArtworkEdit } from '../interfaces/iartwork-edit';
import { ArtworkService } from 'src/app/models/artwork.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-artwork-edit',
  templateUrl: './artwork-edit.component.html',
  styleUrls: ['./artwork-edit.component.scss']
})
export class ArtworkEditComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private snackRef: MatSnackBarRef<SimpleSnackBar>;
  public artworkRecord: IArtworkEdit;
  public formGroup: FormGroup;
  public formErrors = {
    title: '',
    description: ''
  };

  constructor(
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private formValidation: FormValidationService,
    private artworkService: ArtworkService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    if (this.snackRef !== undefined) { this.snackRef.dismiss(); }
  }

  ngOnInit(): void {
    this.artworkRecord = this.route.snapshot.data.artwork;
    this.buildForm();
  }

  buildForm(): void {
    this.formGroup = this.fb.group({
      title: [this.artworkRecord.title, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      description: [ this.artworkRecord.description, [Validators.required, Validators.minLength(3)]]
    });

    this.formGroup.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(item => {
        this.formErrors = this.formValidation.validateForm(this.formGroup, this.formErrors, true);
      });
  }

  submitClick() {
    if (this.snackRef !== undefined) { this.snackRef.dismiss(); }
    this.formValidation.markFormGroupTouched(this.formGroup);

    if (!this.formGroup.valid) {
      this.formValidation.validateForm(this.formGroup, this.formErrors, false);
    } else {
      const formData: IArtworkEdit = {
        _id: this.artworkRecord._id,
        title: this.formGroup.get('title').value,
        description: this.formGroup.get('description').value
      };

      this.artworkService.update(formData)
        .subscribe(
          (res:any) => {
            this.snackRef = this.snackbar.open('Record Saved', 'Close');
            this.router.navigate(['/user-dashboard/view-collection']);
          }, 
          (err: HttpErrorResponse) => {
            const snackError = err.statusText.length != 0 ? err.statusText : err.error.errors.map(e => e.description).join('');
            this.snackRef = this.snackbar.open(snackError, 'Close');
          });
    }
  }

  cancel() {
    this.location.back();
  }

}
