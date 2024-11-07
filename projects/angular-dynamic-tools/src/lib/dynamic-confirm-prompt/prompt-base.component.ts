import { DynamicConfirmPromptService } from './dynamic-confirm-prompt.service';

export class PromptBaseComponent {
    constructor(protected promptService: DynamicConfirmPromptService) {}
}
  