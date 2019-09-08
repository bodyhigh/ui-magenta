import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  /**
   *get all values of the formGroup, loop over them
   *then mark each field as touched
   *
   * @param {FormGroup} formGroup
   * @memberof FormValidationService
   */
  public markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();

        // if (control.controls) {
        //     control.controls.foreach(c => this.markFormGroupTouched(c))
        // }
    });
  }

  /**
   *Return list of error messages
   *
   * @returns
   * @memberof FormValidationService
   */
  public validationMessages() {
    const messages = {
        required: 'This field is required',
        email: 'This field must be an email address',
        password_nomatch: 'Passwords did not match',
        minlength: (params: any) => {
            return `This field must be at least ${params.requiredLength} characters long`
        },
        maxlength: (params: any) => {
            return `This field cannot exceed ${params.requiredLength} characters`
        }
      }

    return messages;
  }

  /**
   *Validate form instance
    *check_dirty true will only emit errors if the field is touched
    *check_dirty false will check all fields independent of
    *being touched or not. Use this as the last check before submitting
    *
    * @param {FormGroup} formToValidate
    * @param {*} formErrors
    * @param {boolean} [checkDirty]
    * @returns
    * @memberof FormValidationService
    */
  public validateForm(formToValidate: FormGroup, formErrors: any, checkDirty?: boolean) {
    const form = formToValidate;

    for(const field in formErrors) {
      if (field) {
        formErrors[field] = '';

        const control = form.get(field);
        const messages = this.validationMessages();

        if (control && !control.valid) {
          if (!checkDirty || (control.dirty || control.touched)) {
            for(const key in control.errors) {
              if (key && (
                key === 'minlength' || key === 'maxlength')) {
                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
              } else {
                formErrors[field] = formErrors[field] || messages[key] || control.errors[key];
              }
            }
          }
        }
      }
    }
    return formErrors;
  }
  
}
