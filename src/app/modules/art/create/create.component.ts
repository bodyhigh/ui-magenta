import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { IArtCreate } from '../iartcreate';
import { ArtService } from 'src/app/models/art.service';
import { HttpErrorResponse } from '@angular/common/http';

interface IArtItem {
  id?: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private snackRef: MatSnackBarRef<SimpleSnackBar>;
  private artData: IArtItem;
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
    private artworkService: ArtService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
    console.log("Cancel this action");
  }

  submitClick() {
    console.log("Submit this form.");

    if (this.snackRef !== undefined) { this.snackRef.dismiss(); }

    this.formValidation.markFormGroupTouched(this.formGroup);

    if (!this.formGroup.valid) {
      this.formValidation.validateForm(this.formGroup, this.formErrors, false)
      console.log("Form is not valid");
    } else {
      const formData: IArtCreate = {
        title: this.formGroup.get("title").value,
        description: this.formGroup.get('description').value
      };

      this.artworkService.create(formData)
      .subscribe((res:any) => {
        this.snackRef = this.snackbar.open('Record Saved', 'Close');
      }, 
      (err: HttpErrorResponse) => {
        const snackError = err.statusText.length != 0 ? err.statusText : err.error.errors.map(e => e.description).join('');
        this.snackRef = this.snackbar.open(snackError, 'Close');
      });

      console.log("Form is valid");
      console.log(formData);
    }
  }

}
