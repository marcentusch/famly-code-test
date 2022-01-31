import { intervalToDuration } from "date-fns";
import { Child } from "./interfaces";

export const defaultChildren: Child[] = [
  { id: 1, name: "Ottone Verner", checkInTime: null, checkOutTime: null },
  { id: 2, name: "Dan Georg", checkInTime: null, checkOutTime: null },
  { id: 3, name: "Katharina Ane", checkInTime: null, checkOutTime: null },
  {
    id: 4,
    name: "Lis Frej",
    checkInTime: new Date("1996-11-17T04:20:00"),
    checkOutTime: null,
  },
  {
    id: 5,
    name: "Kaja Linda",
    checkInTime: new Date("1996-11-17T04:20:00"),
    checkOutTime: new Date("2021-11-11T04:10:00"),
  },
];

export const checkIn = (id: number, children: Child[]): Child[] => {
  const childToCheckIn = children.find((child) => child.id === id);
  if (childToCheckIn?.checkInTime !== null) return [...children];
  return children.map((child) => ({
    ...child,
    checkInTime: child.id === id ? new Date() : child.checkInTime,
  }));
};

export const checkOut = (id: number, children: Child[]): Child[] => {
  const childToCheckOut = children.find((child) => child.id === id);
  if (!childToCheckOut) return [...children];
  return children.map((child) => ({
    ...child,
    checkOutTime: child.id === id ? new Date() : child.checkOutTime,
  }));
};

export const getTwoHourChildren = (children: Child[]): Child[] => {
  return children.filter((child) => {
    if (child.checkInTime === null || child.checkOutTime === null) return false;

    const checkedInDuration = intervalToDuration({
      start: child.checkInTime as Date,
      end: child.checkOutTime as Date,
    });

    const checkedInFor2Hours = checkedInDuration.hours ?? 0 > 2;
    return checkedInFor2Hours;
  });
};

export const getCheckedInChildren = (children: Child[]): Child[] => {
  return children.filter(
    (child) => child.checkInTime !== null && child.checkOutTime === null
  );
};
