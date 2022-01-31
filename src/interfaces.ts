export interface Child {
  id: Readonly<number>;
  name: Readonly<string>;
  checkInTime: Readonly<Date> | null;
  checkOutTime: Readonly<Date> | null;
}

export interface Nursery {
  name: Readonly<string>;
  children: Child[];
}
