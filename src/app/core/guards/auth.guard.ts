import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private _authSvc: AuthenticationService,
    private _router: Router
  ) { }

  canLoad(): Observable<boolean> {
    return this._authSvc.isAuthenticated.pipe(
      filter(initialValue => initialValue !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the observable doesn't complete
      map(isAuthenticated => {
        console.log('AuthGuard: ', isAuthenticated);
        if (isAuthenticated) {
          return true;
        } else {
          this._router.navigateByUrl('/login');
          return false;
        }
      })
    )
  }
}
