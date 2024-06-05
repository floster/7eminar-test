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
  id: number;
  date: string;
  period: EventPeriod;
  kind: EventKinds;
  price: number;
};

export type Events = Event[];

export type Employee = {
  id: number;
  name: string;
  surname: string;
  description: string;
  events: Events;
};
