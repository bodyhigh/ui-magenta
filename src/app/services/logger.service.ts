import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { inspect } from 'util';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(message: any, location?: string) {
    if (message instanceof HttpErrorResponse) {
      this.logHttpErrorResponse(message, location);
    } else {
      console.log(`Logging Message: ${message}`);
    }
    
  }

  logHttpErrorResponse(message: HttpErrorResponse, location?: string) {
    let errLocation = location !== undefined ? `Location: ${location}\n` : '';
    let errMessage = `Log Message [HttpErrorResponse]\n${errLocation}${inspect(message, {colors: true})}`;
    console.log(errMessage);
  }

  inspect(object: any) {
    console.log(inspect(object, {colors: true}));
  }
}
