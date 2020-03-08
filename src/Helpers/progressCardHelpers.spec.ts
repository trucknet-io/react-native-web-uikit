import { getFormatedDate, getProgress } from "./progressCardHelpers";
import moment from "moment";

it("should get progress from 0 to 100", () => {
  const currentOriginDate = new Date(
    moment()
      .add(-1, "days")
      .toDate(),
  );

  const currentDestinationDate = new Date(
    moment()
      .add(1, "days")
      .toDate(),
  );

  const passedDate = new Date("10/10/2000");
  const futureDate = new Date("10/10/3000");

  expect(getProgress(passedDate, passedDate)).toEqual(100);
  expect(getProgress(currentOriginDate, currentDestinationDate)).toEqual(50);
  expect(getProgress(futureDate, futureDate)).toEqual(0);
  expect(getProgress(futureDate, futureDate, 100)).toEqual(100);
});

it("should get formated date without year if it's date with current year", () => {
  const currentDate = new Date();
  const futureDate = new Date(
    moment()
      .add(1, "year")
      .toDate(),
  );
  expect(getFormatedDate(currentDate).day).not.toContain(currentDate.getFullYear().toString());
  expect(getFormatedDate(futureDate).day).toContain(futureDate.getFullYear().toString());
});
