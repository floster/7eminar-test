export enum EventKinds {
  Online = "Online consultation",
  Offline = "Offline consultation",
  Phone = "Telephone consultation",
}

export interface TimePeriod<T> {
  start: T;
  end: T;
}

export type Event = {
  id: string;
  date: Date;
  period: TimePeriod<string>;
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
