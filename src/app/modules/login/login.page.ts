import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authSvc: AuthenticationService,
    private _alertCtlr: AlertController,
    private _router: Router,
    private _loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.credentials = this._fb.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password: ['cityslicka', [Validators.required, Validators.minLength(6)]]
    })
  }

  async login() {
    const loading = await this._loadingCtrl.create();
    await loading.present();

    this._authSvc.login(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this._router.navigateByUrl('/app', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this._alertCtlr.create({
          header: 'Login failed',
          message: res.error.error,
          buttons: ['OK']
        });

        await alert.present();
      }
    );

  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

}
