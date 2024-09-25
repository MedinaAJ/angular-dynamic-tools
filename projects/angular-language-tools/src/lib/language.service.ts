import {Injectable} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';

/**
 * Wrapper of TranslocoService to be used in components and services
 */
@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private translocoService: TranslocoService
  ) {
  }

  /**
   * Get the default language defined in TranslocoService.
   * @returns The default language.
   */
  getDefaultLang(): string {
    return this.translocoService.getDefaultLang();
  }

  /**
   * Get the currently active language.
   * @returns The active language.
   */
  getActiveLang(): string {
    return this.translocoService.getActiveLang();
  }

  /**
   * Set the active language to the specified language.
   * @param lang The language to set as active.
   */
  setActiveLang(lang: string): void {
    this.translocoService.setActiveLang(lang);
  }

  /**
   * Get the available languages.
   * @returns An array of available languages, either as an array of string language codes
   *          or as an array of objects with `id` and `label` properties.
   */
  getAvailableLangs(): { id: string, label: string }[] | string[] {
    return this.translocoService.getAvailableLangs();
  }
}
