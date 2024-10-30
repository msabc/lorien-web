export const validateInput = (
  departureCodeTextValue,
  destinationCodeTextValue,
  departureDate,
  numberOfPassengers
) => {
  if (departureCodeTextValue.length !== 3) {
    return false;
  }

  if (destinationCodeTextValue.length !== 3) {
    return false;
  }

  const isValidDate = Date.parse(departureDate);
  console.log('isValidDate', isValidDate)
  if (isNaN(isValidDate)) {
    console.error("invalid date format");
    return false;
  }

  if (numberOfPassengers.length < 1 && numberOfPassengers > 50) {
    return false;
  }

  return true;
};
