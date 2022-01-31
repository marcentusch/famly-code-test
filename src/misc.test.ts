import { Child } from "./interfaces";
import {
  checkIn,
  checkOut,
  defaultChildren,
  getCheckedInChildren,
  getTwoHourChildren,
} from "./misc";

test("check out", () => {
  // Arrange
  const children: Child[] = defaultChildren;
  const childToBeRemoved = { ...children[1] };

  // Act
  const updatedChildren = checkOut(childToBeRemoved.id, children);

  // Assert
  const checkedOutChild = updatedChildren.find(
    (child) => child.id === childToBeRemoved.id
  );
  expect(checkedOutChild?.name).toBe("Dan Georg");
  expect(checkedOutChild?.checkOutTime).toBeTruthy();
});

test("check in", () => {
  // Arrange
  const children: Child[] = defaultChildren;
  const childToBeAdded = { ...children[1] };

  // Act
  const updatedChildren = checkIn(childToBeAdded.id, children);

  // Assert
  const checkedInChild = updatedChildren.find(
    (child) => child.id === childToBeAdded.id
  );
  expect(checkedInChild?.name).toBe("Dan Georg");
  expect(checkedInChild?.checkInTime).toBeTruthy();
});

test("Find two hour children", () => {
  // Arrange
  const children: Child[] = defaultChildren;

  // Act
  const twoHourChildren = getTwoHourChildren(children);

  // Assert
  expect(twoHourChildren[0].name).toBe("Kaja Linda");
});

test("Find children who are currently checked in", () => {
  // Arrange
  const children: Child[] = defaultChildren;

  // Act
  const checkedInChildren = getCheckedInChildren(children);

  // Assert
  expect(checkedInChildren[0].name).toBe("Lis Frej");
});
