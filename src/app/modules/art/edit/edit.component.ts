import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { IArtworkEdit } from '../interfaces/iartwork-edit';
import { ArtworkService } from 'src/app/models/artwork.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
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
    private route: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    
  }

  ngOnInit() {
    this.artworkRecord = this.route.snapshot.data.artwork;
    console.log(this.artworkRecord);
  }

}
