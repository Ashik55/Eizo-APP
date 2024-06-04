import moment from "moment-timezone";

// Check how many months have passed since the subscription was renewed/started
function calculateDifferenceInMonths(
  renewedAt: moment.Moment,
  expiresAt: moment.Moment,
) {
  const timeNow = moment().tz("Etc/UTC");

  const diffMonthsToGetTillNow = Math.ceil(
    moment(moment(timeNow)).diff(moment(renewedAt), "months", true),
  );

  const pendingMonthsToGetInTotal = expiresAt.diff(renewedAt, "months") + 1;

  return {
    diffMonthsToGetTillNow,
    pendingMonthsToGetInTotal,
  };
}

export default calculateDifferenceInMonths;
