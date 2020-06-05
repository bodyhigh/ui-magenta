import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

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
    private fb: FormBuilder
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

}
