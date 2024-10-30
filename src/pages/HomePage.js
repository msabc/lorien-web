import { Alert, Snackbar, Stack } from "@mui/material";
import FlightFilters from "../components/FlightFilters";
import FlightOffers from "../components/FlightOffers";
import { getFlightPrices } from "../components/services/FlightPricingService";
import { useState } from "react";

export default function HomePage() {
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [isErrorNotificationOpen, setIsErrorNotificationOpen] = useState(false);
  const [errorNotificationMessage, setErrorNotificationMessage] = useState("");
  
  const handleError = (errorMessage) => {
    setErrorNotificationMessage(errorMessage);
    setIsErrorNotificationOpen(true);
  };

  const handleErrorNotificationClose = () => {
    setIsErrorNotificationOpen(false);
  };

  const handleSearch = ({
    departureCode,
    destinationCode,
    departureDate,
    numberOfPassengers,
  }) => {
    setIsRequestLoading(true);

    getFlightPrices(
      departureCode,
      destinationCode,
      departureDate,
      numberOfPassengers
    )
      .then((response) => {
        const parsedResponse = JSON.parse(response);
        setOffers(parsedResponse.flightOffers);
      })
      .catch((error) => {
        setErrorNotificationMessage("An unexpected error occurred. Please try again later.");
        setIsErrorNotificationOpen(true);
      })
      .finally(() => {
        setIsRequestLoading(false);
      });
  };

  return (
    <Stack spacing={5}>
      <FlightFilters invokeSearch={handleSearch} invokeError={handleError}/>
      <FlightOffers isRequestLoading={isRequestLoading} offers={offers} />
      <Snackbar
        open={isErrorNotificationOpen}
        autoHideDuration={6000}
        onClose={handleErrorNotificationClose}
      >
        <Alert
          onClose={handleErrorNotificationClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorNotificationMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
