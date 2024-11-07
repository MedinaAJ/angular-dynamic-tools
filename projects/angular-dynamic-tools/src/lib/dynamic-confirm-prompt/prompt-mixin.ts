import { DynamicConfirmPromptService } from './dynamic-confirm-prompt.service';
import { Validators } from '@angular/forms';

type Constructor<T = {}> = new (...args: any[]) => T;

export function PromptMixin<TBase extends Constructor>(Base: TBase = Object as unknown as TBase) {
  return class extends Base {
    constructor(...args: any[]) {
      super(...args);
    }

    openErrorPrompt(description: string) {
      (this as any).promptService.open({
        title: '¡Error!',
        description,
        icon: 'error',
        saveButtonText: 'Aceptar',
        saveButtonIcon: 'check'
      });
    }

    openSuccessPrompt(description: string, onAccept?: () => void) {
      (this as any).promptService.open({
        title: '¡Éxito!',
        description,
        icon: 'check_circle',
        saveButtonText: 'Aceptar',
        saveButtonIcon: 'check'
      }).subscribe((result: any) => {
        if (result?.event === 'save' && onAccept) {
          onAccept();
        }
      });
    }

    openConfirmPrompt(description: string, onConfirm: () => void) {
      (this as any).promptService.open({
        title: 'Confirmar acción',
        description,
        icon: 'warning',
        saveButtonText: 'Confirmar',
        saveButtonIcon: 'check',
        cancelButtonText: 'Cancelar',
        cancelButtonIcon: 'close',
        showCancelButton: true
      }).subscribe((result: any) => {
        if (result?.event === 'save') {
          onConfirm();
        }
      });
    }

    openDatePrompt(description: string, onSave: (data: string) => void) {
      const localDate = new Date();
      const defaultDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);

      (this as any).promptService.open({
        title: 'Introduce la fecha efectiva',
        description,
        icon: 'calendar_today',
        saveButtonText: 'Guardar',
        saveButtonIcon: 'check',
        cancelButtonText: 'Cancelar',
        cancelButtonIcon: 'close',
        showCancelButton: true,
        inputType: 'datetime-local',
        defaultValue: defaultDate,
        validators: [Validators.required]
      }).subscribe((result: any) => {
        if (result?.event === 'save' && result.data) {
          onSave(result.data);
        }
      });
    }
  };
}
