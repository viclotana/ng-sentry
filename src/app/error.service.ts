import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "COPY YOUR DSN IN HERE"
});


@Injectable({
  providedIn: 'root'
})
export class SentryErrorHandler implements ErrorHandler{

  constructor(private injector: Injector) { }
  
  handleError(error: any) {
    const router = this.injector.get(Router);
    const eventId = Sentry.captureException(error.originalError || error);
    
    if (Error instanceof HttpErrorResponse) {
      console.log(error.status);
    }
    else {
      console.error("an error occured here broo");
      Sentry.showReportDialog({ eventId });
    }

    router.navigate(['error']); 
  }
   
}
