export enum EventKinds {
  Online = "Online consultation",
  Offline = "Offline consultation",
  Phone = "Telephone consultation",
}

export interface EventPeriod {
  start: string;
  end: string;
}

export type Event = {
  id: string;
  date: string;
  period: EventPeriod;
  kind: EventKinds | undefined;
  price: number;
};

export type Events = Event[];

export type Employee = {
  id: string;
  name: string;
  surname: string;
  description: string | undefined;
  events: Events | [];
};
