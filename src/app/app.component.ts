import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = environment.websiteTitle;

  constructor(
    private translate: TranslateService,
  ) {
    translate.addLangs(['en', 'sl']);
    if(localStorage.getItem('language')) {
      translate.setDefaultLang('sl');
      translate.use(localStorage.getItem('language')!);
    } else {
      translate.setDefaultLang(translate.getBrowserLang() ?? 'en');
      translate.use(translate.getBrowserLang() ?? 'en');
      localStorage.setItem('language', this.translate.currentLang);
    }
  }
}
