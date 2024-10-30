import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import {
  getCurrencyCodes,
  getIATACodes,
} from "./services/FlightPricingService";
import { LorienSettings } from "./settings/LorienSettings";
import { validateInput } from "../data/Validation";

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
    setDepartureDate(new Date(e.target.value).toISOString().split("T")[0]);
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
      numberOfPassengers: numberOfPassengers
    });
  };

  const handleOnDropdownChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Stack direction="row" spacing={2}>
        <Autocomplete
          disablePortal
          loading={isDepartureRequestLoading}
          options={departureIATACodes}
          sx={{ width: 150 }}
          size="small"
          variant="outlined"
          onChange={handleOnDropdownChange}
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
        <Autocomplete
          disablePortal
          loading={isDestinationRequestLoading}
          options={destinationIATACodes}
          sx={{ width: 150 }}
          size="small"
          variant="outlined"
          getOptionLabel={(option) => option.iata}
          onChange={handleOnDropdownChange}
          renderInput={(params) => (
            <TextField
              {...params}
              value={destinationCodeTextValue}
              onChange={handleOnDestinationCodeValueChange}
              label="To"
            />
          )}
        />
        <TextField
          label="Departure date"
          variant="outlined"
          size="small"
          placeholder="Departure date"
          type="date"
          value={departureDate}
          onChange={handleOnDepartureDateValueChange}
        />
        <TextField
          label="No. of passengers"
          variant="outlined"
          size="small"
          type="number"
          value={numberOfPassengers}
          onChange={handleOnNumberOfPassengersTextValueChange}
        />
        <FormControl>
          <InputLabel id="currencies-input-label">Currency</InputLabel>
          <Select
            size="small"
            value={currencyCodeValue}
            label="Currency"
            sx={{ width: 150 }}
            onChange={handleOnCurrencyCodeValueChange}
          >
            {Array.isArray(currencies) &&
              currencies.length > 0 &&
              currencies.map((x) => (
                <MenuItem value={x.currency}>{x.alphabeticcode}</MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          endIcon={<SearchIcon />}
          onClick={handleOnSearchButtonClick}
        >
          Search
        </Button>
      </Stack>
    </Paper>
  );
}
