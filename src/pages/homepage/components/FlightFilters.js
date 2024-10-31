import {
  Autocomplete,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import { LorienSettings } from "../../../settings/LorienSettings";
import { validateInput } from "../../../data/Validation";
import { getCurrencyCodes, getIATACodes } from "../../../services/FlightPricingService";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

export default function FlightFilters(props) {
  const { invokeSearch, invokeError } = props;

  const [isCurrencyRequestLoading, setIsCurrencyRequestLoading] =
    useState(true);
  const [isDepartureRequestLoading, setIsDepartureRequestLoading] =
    useState(false);
  const [isDestinationRequestLoading, setIsDestinationRequestLoading] =
    useState(false);

  const [currencies, setCurrencies] = useState([]);
  const [destinationIATACodes, setDestinationIATACodes] = useState([]);
  const [departureIATACodes, setDepartureIATACodes] = useState([]);

  const [departureCodeTextValue, setDepartureCodeTextValue] = useState("");
  const [destinationCodeTextValue, setDestinationCodeTextValue] = useState("");
  const [numberOfPassengers, setNumberOfPassengers] = useState(1);
  const [currencyCodeValue, setCurrencyCodeValue] = useState("");
  const [departureDate, setDepartureDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState(dayjs());

  useEffect(() => {
    getCurrencyCodes()
      .then((response) => {
        const parsedResponse = JSON.parse(response);
        setCurrencies(parsedResponse.currencies);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsCurrencyRequestLoading(false);
      });
  }, []);

  useEffect(() => {
    if (
      departureCodeTextValue.length >=
      LorienSettings.MinNumberOfIATACodeCharactersForRequest
    ) {
      setIsDepartureRequestLoading(true);

      getIATACodes(departureCodeTextValue)
        .then((response) => {
          const parsedResponse = JSON.parse(response);
          setDepartureIATACodes(parsedResponse.iataCodes);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsDepartureRequestLoading(false);
        });
    }
  }, [departureCodeTextValue]);

  useEffect(() => {
    if (
      destinationCodeTextValue.length >=
      LorienSettings.MinNumberOfIATACodeCharactersForRequest
    ) {
      setIsDestinationRequestLoading(true);

      getIATACodes(destinationCodeTextValue)
        .then((response) => {
          const parsedResponse = JSON.parse(response);
          setDestinationIATACodes(parsedResponse.iataCodes);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsDestinationRequestLoading(false);
        });
    }
  }, [destinationCodeTextValue]);

  const handleOnDepartureCodeValueChange = (e) => {
    setDepartureCodeTextValue(e.target.value);
  };

  const handleOnDestinationCodeValueChange = (e) => {
    setDestinationCodeTextValue(e.target.value);
  };

  const handleOnDepartureDateValueChange = (e) => {
    const value = e.target.value;

    if (value === '') {
      setDepartureDate('');
    } else {
      setDepartureDate(new Date(e.target.value).toISOString().split("T")[0]);
    }
  };

  const handleOnNumberOfPassengersTextValueChange = (e) => {
    const value = Number(e.target.value);

    if (value < 0 || value > 50) {
      return;
    }

    setNumberOfPassengers(Number(e.target.value));
  };

  const handleOnCurrencyCodeValueChange = (e) => {
    setCurrencyCodeValue(e.target.value);
  };

  const handleOnSearchButtonClick = () => {
    const validationResult = validateInput(
      departureCodeTextValue,
      destinationCodeTextValue,
      departureDate,
      numberOfPassengers
    );

    if (!validationResult) {
      invokeError("Invalid data.");
      return;
    }

    invokeSearch({
      departureCode: departureCodeTextValue,
      destinationCode: destinationCodeTextValue,
      departureDate: departureDate,
      numberOfPassengers: numberOfPassengers,
    });
  };
  const handleOnDepartureDropdownChange = (e) => {
    setDepartureCodeTextValue(e.target.textContent);
  };
  const handleOnDestinationDropdownChange = (e) => {
    setDestinationCodeTextValue(e.target.textContent);
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Grid container gap={1}>
        <Grid size={2}>
          <Autocomplete
            disablePortal
            loading={isDepartureRequestLoading}
            options={departureIATACodes}
            onChange={handleOnDepartureDropdownChange}
            size="small"
            variant="outlined"
            getOptionLabel={(option) => option.iata}
            renderInput={(params) => (
              <TextField
                {...params}
                value={departureCodeTextValue}
                onChange={handleOnDepartureCodeValueChange}
                label="Departure"
              />
            )}
          />
        </Grid>
        <Grid size={2}>
          <Autocomplete
            disablePortal
            loading={isDestinationRequestLoading}
            options={destinationIATACodes}
            onChange={handleOnDestinationDropdownChange}
            size="small"
            variant="outlined"
            getOptionLabel={(option) => option.iata}
            renderInput={(params) => (
              <TextField
                {...params}
                value={destinationCodeTextValue}
                onChange={handleOnDestinationCodeValueChange}
                label="Destination"
              />
            )}
          />
        </Grid>
        <Grid size={2}>
          <TextField
            label="Departure date"
            variant="outlined"
            size="small"
            placeholder="Departure date"
            type="date"
            value={departureDate}
            onChange={handleOnDepartureDateValueChange}
          />
        </Grid>
        <Grid size={2}>
          <TextField
            label="No. of passengers"
            variant="outlined"
            size="small"
            type="number"
            value={numberOfPassengers}
            onChange={handleOnNumberOfPassengersTextValueChange}
          />
        </Grid>
        <Grid size={2}>
          <Autocomplete
            disablePortal
            loading={isCurrencyRequestLoading}
            options={currencies}
            onChange={handleOnCurrencyCodeValueChange}
            size="small"
            variant="outlined"
            getOptionLabel={(option) => option.alphabeticcode}
            renderInput={(params) => (
              <TextField
                {...params}
                value={currencyCodeValue}
                onChange={handleOnCurrencyCodeValueChange}
                label="Currency"
              />
            )}
          />
        </Grid>
        <Grid size={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={returnDate}
              label="Return date"
              slotProps={{ field: { clearable: true }, textField: { size: 'small' } }}
              onChange={(newValue) => setReturnDate(newValue)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid size={2}>
          <Button
            fullWidth
            variant="contained"
            endIcon={<SearchIcon />}
            onClick={handleOnSearchButtonClick}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
