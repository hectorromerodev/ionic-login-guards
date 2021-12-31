import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(
    private _authSvc: AuthenticationService,
    private _router: Router
  ) {

  }

  canLoad(): Observable<boolean> {
    return this._authSvc.isAuthenticated.pipe(
      filter(initialVal => initialVal !== null),
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          // Directly open inside area
          this._router.navigateByUrl('/app', { replaceUrl: true });
        } else {
          // Simply allow acces to the login
          return true;
        }
      })
    );
  }
}
