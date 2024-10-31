import { Alert, Snackbar, Stack, Typography } from "@mui/material";
import FlightFilters from "./components/FlightFilters";
import FlightOffers from "./components/FlightOffers";
import { useState } from "react";
import { getFlightPrices } from "../../services/FlightPricingService";
import Loading from "../../components/Loading";

export default function HomePage() {
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [requestedData, setRequestedData] = useState({});
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
    setRequestedData({
      departureCode: departureCode,
      destinationCode: destinationCode,
      departureDate: departureDate,
      numberOfPassengers: numberOfPassengers,
    });

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
      .catch(() => {
        setErrorNotificationMessage(
          "An unexpected error occurred. Please try again later."
        );
        setIsErrorNotificationOpen(true);
      })
      .finally(() => {
        setIsRequestLoading(false);
      });
  };

  const renderFlightOffers = () => {
    if (isRequestLoading) {
      return <Loading />;
    }

    if (offers && offers.length > 0) {
      return <FlightOffers offers={offers} requestedData={requestedData} />;
    } else {
      return <></>;
    }
  };

  return (
    <Stack spacing={5}>
      <Stack spacing={2}>
        <Typography variant="h3" fontWeight="bold">
          Lorien
        </Typography>
        <Typography variant="body1">
          Lorien helps you search for cheap flights around the 🌍.
        </Typography>
        <Typography variant="body1">
          Use the filters to find a flight. Click <b>Search</b> to get started.
        </Typography>
      </Stack>

      <FlightFilters
        invokeSearch={handleSearch}
        invokeError={handleError}
        request={requestedData}
      />

      {renderFlightOffers()}

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
