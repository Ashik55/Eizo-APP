import moment from "moment-timezone";

// Convert the timezone of the date string to UTC
function convertTimezone(originalDateString: string) {
  // Parse original date string into a Moment object
  const originalDate = moment(originalDateString);

  // Convert to target timezone
  const convertedDate = originalDate.tz("Etc/UTC");

  // Format the converted date in ISO string format
  const convertedDateString = convertedDate.format();
  console.log(convertedDateString, moment().tz("Etc/UTC").format());

  return convertedDateString;
}

export default convertTimezone;
