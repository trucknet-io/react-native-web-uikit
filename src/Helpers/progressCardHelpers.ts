import moment from "moment";

export const getFormatedDate = (date: Date) => {
  return {
    time: moment(date).format("LT"),
    day: moment(date)
      .format("ll")
      .replace(`${moment().year()}`, "")
      .replace(",", "")
      .trim(),
  };
};

export const getProgress = (originDate: Date, destinationDate: Date, currentProgress?: number) => {
  if (currentProgress) return currentProgress;
  const startTime = moment(originDate);
  const currentTime = moment();
  const endTime = moment(destinationDate);
  if (currentTime.isBefore(startTime)) return 0;
  if (currentTime.isAfter(endTime)) return 100;
  return Math.floor(100 * (currentTime.diff(startTime) / endTime.diff(startTime)));
};
