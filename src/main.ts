import { prompt } from "inquirer";
import { InitialChoices } from "./Enums";
import { Child, Nursery } from "./interfaces";
import {
  checkIn,
  checkOut,
  defaultChildren,
  getCheckedInChildren,
  getTwoHourChildren,
} from "./misc";

const nursery: Nursery = {
  name: "Sunnyside Daycare",
  children: [...defaultChildren],
};

const questions = [
  {
    type: "list",
    name: "whatToDo",
    message: "What do you want to do",
    choices: [
      InitialChoices.Overview,
      InitialChoices.CheckIn,
      InitialChoices.CheckOut,
    ],
  },
  {
    type: "list",
    name: "checkIn",
    message: "Who do you want to check in?",
    choices: [
      ...nursery.children.map((child) => ({
        name: child.name,
        value: child.id,
      })),
    ],
    when: (answers: any) => answers.whatToDo === InitialChoices.CheckIn,
  },
  {
    type: "list",
    name: "checkOut",
    message: "Who do you want to check out?",
    choices: () => [
      ...getCheckedInChildren(nursery.children).map((child) => ({
        name: child.name,
        value: child.id,
      })),
    ],
    when: (answers: any) => answers.whatToDo === InitialChoices.CheckOut,
  },
];

export const main = async (): Promise<boolean> => {
  console.log(`Hi, welcome to ${nursery.name} \n`);
  while (true) {
    console.log("\n");
    await prompt(questions).then((answers) => {
      if (answers.whatToDo === InitialChoices.Overview) {
        showOverview(nursery.children);
      }
      if (answers.checkOut) {
        nursery.children = checkOut(answers.checkOut, nursery.children);
      }
      if (answers.checkIn) {
        nursery.children = checkIn(answers.checkIn, nursery.children);
      }
      console.log("\n");
    });
  }
};

function showOverview(children: Child[]): void {
  console.log("\n All Children \n");
  children.forEach((child) => console.log(`${child.id} - ${child.name}`));

  console.log("\n Children checked in \n");
  getCheckedInChildren(children).forEach((child) =>
    console.log(`${child.id} - ${child.name}`)
  );

  console.log("\n Children checked in for 2 hours or more \n");
  const twoHourChildren = getTwoHourChildren(children);
  twoHourChildren.forEach((child) =>
    console.log(`${child.id} - ${child.name}`)
  );
}
