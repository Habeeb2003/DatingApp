import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err) {
          switch (err.status) {
            case 400:
              if (err.error.errors) {
                const modalStateErrors = []
                for (const key in err.error.errors) {
                  modalStateErrors.push(err.error.errors[key])
                }
                throw modalStateErrors.flat();
              }
              else if (typeof (err.error) === 'object') {
                this.toastr.error(err.statusText, err.status)
              }
              else {
                this.toastr.error(err.error, err.status)
              }
              break;
            case 401:
              this.toastr.error(err.statusText, err.status)
              break;
            case 404:
              this.router.navigateByUrl("/not-found");
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: err.error}}
              this.router.navigateByUrl("/server-error", navigationExtras);
              break;
            default:
              this.toastr.error("something unexpected went wrong")
              console.log(err);
              break;
          }
        }
        return throwError(err)
      })
    )
  }
}
