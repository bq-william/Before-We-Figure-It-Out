export type Device = 'compact' | 'phone-mia' | 'phone-theo' | 'phone-third';
export type Act = 1 | 2 | 3;
export type Format = '16:9' | '9:16';

export interface Marker {
  label: string;   // short label shown on card, e.g. "FORMAT SHIFT"
  detail: string;  // longer note shown in modal
  type: 'format' | 'structural' | 'sound' | 'character';
}

export interface Clip {
  id: string;
  title: string;
  act: Act;
  device: Device;
  format: Format;
  date: string;
  location: string;
  description: string;
  technicalNote: string;
  directorNote?: string;
  listItem?: string;
  special?: 'argument' | 'mirror' | 'screenshot';
  markers?: Marker[];
}

export interface ListItem {
  num: number;
  text: string;
  checked: boolean;
  completedNote?: string;
  obscured?: boolean;
}
