import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }

  /**
   *Regular Expression Validator
   *Usage: [see passwordValidator()]
   *
   * @param {RegExp} regex
   * @param {ValidationErrors} error
   * @returns {ValidatorFn}
   * @memberof FormValidationService
   */
  public regexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  /**
   *Password validator requires the following 
   * - min 8 characters
   * - min 1 upper case character
   * - min 1 lower case character
   * - min 1 number
   * - min 1 special character [!@#$%^&.]
   *
   * @returns {ValidatorFn}
   * @memberof FormValidationService
   */
  public passwordValidator(): ValidatorFn {
    return this.regexValidator(
      new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&.]).{8,}'), { 
        'passwordComplexity': 'Password must be 8 characters, and contain an upper case, a lower case, a number and special character [!@#$%^&.]'
      });
  }

  /**
   *Validator that ensures password fields ('password' and 'passwordConfim') match
   *
   * @param {AbstractControl} c
   * @returns {ValidatorFn}
   * @memberof CustomValdator
   */
  public passwordMatcherValidator(c: AbstractControl): ValidatorFn {
    if (!c.get('password') || !c.get('passwordConfirm')) return null;

    if (c.get('password').value !== c.get('passwordConfirm').value){
      c.get('passwordConfirm').setErrors({ password_nomatch: true });
    }

    return null;
  }
}
