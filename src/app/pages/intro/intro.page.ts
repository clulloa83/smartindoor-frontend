import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { INTRO_KEY } from 'src/app/services/intro.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
	@ViewChild(IonSlides) slides: IonSlides;

  constructor(
    private storageService: StorageService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  next() {
		this.slides.slideNext();
	}

  start = async() => {
    await this.storageService.set(INTRO_KEY, true);
    this.router.navigateByUrl('/login', { replaceUrl: true });
	}

}
