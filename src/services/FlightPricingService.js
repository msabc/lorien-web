import { LorienUrls } from "../data/constants/LorienUrls";

const getFlightPricesPath =
  LorienUrls.Base + LorienUrls.FlightPricing.GetFlightPrices;
const getCurrencyCodesPath =
  LorienUrls.Base + LorienUrls.FlightPricing.GetCurrencyCodes;
const getIATACodesPath =
  LorienUrls.Base + LorienUrls.FlightPricing.GetIATACodes;

export async function getFlightPrices(
  originLocationCode,
  destinationLocationCode,
  departureDate,
  adults
) {
  try {
    const response = await fetch(
      `${getFlightPricesPath}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}`,
      {
        method: "GET",
      }
    );

    return response.text();
  } catch (error) {
    console.error(error);
  }
}

export async function getCurrencyCodes() {
  try {
    const response = await fetch(getCurrencyCodesPath, {
      method: "GET",
    });

    return response.text();
  } catch (error) {
    console.error(error);
  }
}

export async function getIATACodes(input) {
  try {
    const response = await fetch(`${getIATACodesPath}?Input=${input}`, {
      method: "GET",
    });

    return response.text();
  } catch (error) {
    console.error(error);
  }
}
