import {Component} from '@angular/core';
import {LanguageService} from '../language.service';

@Component({
  selector: 'language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {

  availableLangs: { id: string, label: string }[];
  activeLang: string;

  constructor(
    private languageService: LanguageService
  ) {
    this.availableLangs = this.languageService.getAvailableLangs() as { id: string, label: string }[];
    this.activeLang = this.languageService.getActiveLang();
  }

  changeLanguage(lang: string) {
    this.languageService.setActiveLang(lang);
    this.activeLang = lang;
  }

}
