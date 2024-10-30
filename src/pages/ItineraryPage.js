import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import * as React from "react";
import { useLocation } from "react-router-dom";

export default function ItineraryPage() {
  const location = useLocation();
  console.log("stejtic:", location.state);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Itinerary details
      </Typography>
      <Typography>
      </Typography>
    </Container>
  );
}
