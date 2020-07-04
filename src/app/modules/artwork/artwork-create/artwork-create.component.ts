import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { IArtCreate } from '../interfaces/iartcreate';
import { ArtworkService } from 'src/app/models/artwork.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-artwork-create',
  templateUrl: './artwork-create.component.html',
  styleUrls: ['./artwork-create.component.scss']
})
export class ArtworkCreateComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private snackRef: MatSnackBarRef<SimpleSnackBar>;
  private artData: IArtCreate;
  public formGroup: FormGroup;
  public formErrors = {
    title: '',
    description: '',
    imageFile: ''
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

  ngOnInit() {
    this.artData = { title: '', description: '' };
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.fb.group({
      title: [ this.artData.title, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      description: [ this.artData.description, [Validators.required, Validators.minLength(3)]]
    });
  }

  cancel() {
    this.location.back();
  }

  submitClick() {
    if (this.snackRef !== undefined) { this.snackRef.dismiss(); }

    this.formValidation.markFormGroupTouched(this.formGroup);

    if (!this.formGroup.valid) {
      this.formValidation.validateForm(this.formGroup, this.formErrors, false)
    } else {
      const formData: IArtCreate = {
        title: this.formGroup.get("title").value,
        description: this.formGroup.get('description').value
      };

      this.artworkService.create(formData)
      .subscribe((res:any) => {
        this.snackRef = this.snackbar.open('Record Saved', 'Close');
        this.router.navigate(['/user-dashboard/view-collection']);
      }, 
      (err: HttpErrorResponse) => {
        const snackError = err.statusText.length != 0 ? err.statusText : err.error.errors.map(e => e.description).join('');
        this.snackRef = this.snackbar.open(snackError, 'Close');
      });

      // console.log("Form is valid");
      // console.log(formData);
    }
  }

}
