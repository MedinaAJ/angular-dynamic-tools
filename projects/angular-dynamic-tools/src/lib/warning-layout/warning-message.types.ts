export interface ButtonAction {
  label: string;
  link: string;
  icon?: string;
}

export interface WarningMessage {
  title: string;
  description?: string;
  actions?: ButtonAction[];
}
