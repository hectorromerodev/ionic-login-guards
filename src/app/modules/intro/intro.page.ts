import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { IonSlides } from '@ionic/angular';
import { INTRO_KEY } from 'src/app/core/guards/intro.guard';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  next() {
    this.slides.slideNext();
  }

  async start() {
    await Storage.set({ key: INTRO_KEY, value: 'true' });
    this._router.navigateByUrl('/login', { replaceUrl: true });
  }

}
