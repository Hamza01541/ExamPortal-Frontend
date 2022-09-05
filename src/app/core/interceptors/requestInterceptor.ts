import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services';
import { User } from 'src/app/shared/models/user.model';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  token: string = '';
  currentUser: User = new User();
  assetBaseUrl: string = `assets/`;

  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  /**
   * Checks if Api request header is required or not.
   * If request header is required then set headers with tiken in the Api request.
   * @param request Request
   * @param next in flight HttpRequest
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.currentUser = this.localStorageService.get('user');
    const currentToken = this.currentUser?.token;

    if (this.isHeaderRequired(request)) {
      if (currentToken?.length) {
        request = this.setRequestHeader(request, currentToken);
      }
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    )
  }


  /**
   * Checks either request headers are required for current request or not.
   * @param request: HttpRequest<any> request API request to be made
   * @returns boolean
   */
  private isHeaderRequired(request: HttpRequest<any>): boolean {
    return !(request.url.includes(this.assetBaseUrl) || request.url.includes("login"));
  }

  /**
   * Set headers in API request.
   * @param request<any> request API request to be made
   * @param currentToken<string> token to add to headers
   * @returns HttpRequest<any> Request with/without headers
   */
  private setRequestHeader(
    request: HttpRequest<any>,
    currentToken: string
  ): HttpRequest<any> {
    let options: any = {
      Authorization: `Bearer ${currentToken}`,
    };

    /**
     * Check if content-type is present in header already skip it else add it
     */
    const hasContentType: boolean = request.headers.has('Content-Type');
    if (!hasContentType) {
      options['Content-Type'] = 'application/json';
    }

    const httpOptions = {
      headers: new HttpHeaders(options),
    };

    request = request.clone(httpOptions);
    return request;
  }
}
