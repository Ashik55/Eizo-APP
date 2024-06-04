const getHourDifference = (date: string): number => {
  const givenDate = new Date(date);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - givenDate.getTime();
  const timeDifferenceInHours = timeDifference / (1000 * 60 * 60);
  return timeDifferenceInHours;
};

export default getHourDifference;
