import { ChevronRight } from "@mui/icons-material";
import { Button, Divider, Paper, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import * as React from "react";
import { useLocation } from "react-router-dom";

export default function ItineraryDetailsPage() {
  const location = useLocation();

  const { request, data } = location.state;

  if (!request) {
    return <></>;
  }

  const {
    departureCode,
    destinationCode,
    departureDate
  } = request || {};

  const { itineraries } = data;

  var dateFormattingOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const handleOnNextClick = () => {
    alert('This is as far as we can go for now.');
  }

  return (
    <Container sx={{ mb: 10 }}>
      <Stack spacing={2}>
        <Typography variant="h5" gutterBottom>
          Itineraries for flight from <b>{departureCode}</b> to  <b>{destinationCode}</b> on <b>{new Date(departureDate).toLocaleDateString("en-GB", dateFormattingOptions)}</b>
        </Typography>
        <Divider />
        {itineraries.map((x, index) => <FlightItinerary duration={x.duration} segments={x.segments} key={index} />)}
        <Button variant="contained" endIcon={<ChevronRight />} onClick={handleOnNextClick}>Next</Button>
      </Stack>
    </Container>
  );
}

function FlightItinerary(props) {
  const { duration, segments } = props;

  return (
    <Stack spacing={2}>
      <Typography variant="body1">Duration: <b>{duration}</b></Typography>
      <Stack spacing={2}>
        {segments.map((x, index) => <FlightSegment segment={x} key={index} />)}
      </Stack>
    </Stack>
  )
}

function FlightSegment(props) {
  const { segment } = props;
  return (
    <Paper sx={{ p: 2 }} elevation={2}>
      <Stack spacing={1}>
        <Typography variant="h6">#{segment.number}</Typography>
        <Typography>Duration: {segment.duration}</Typography>
        <Divider />
        <Typography fontWeight="bold">Departure</Typography>
        <Typography>Airport: {segment.departure.iataCode}</Typography>
        <Typography>Terminal: {segment.departure.terminal ?? 'N/A'}</Typography>
        <Typography>Time: {segment.departure.at}</Typography>
        <Divider />
        <Typography fontWeight="bold">Arrival</Typography>
        <Typography>Airport: {segment.arrival.iataCode}</Typography>
        <Typography>Terminal: {segment.arrival.terminal ?? 'N/A'}</Typography>
        <Typography>Time: {segment.arrival.at}</Typography>
      </Stack>
    </Paper>
  )
}
