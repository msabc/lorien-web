import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";
import { CheckCircle, ChevronRight, RemoveCircle } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { LorienRoutes } from "../../../data/constants/LorienRoutes";

export default function FlightOffers(props) {
  const { offers, requestedData } = props;
  const location = useLocation();

  const columns = useMemo(
    () => [
      {
        field: "source",
        headerName: "Source",
        width: 100,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "oneway",
        headerName: "One way",
        renderCell: (params) => {
          if (params.row.oneway) {
            return <CheckCircle color="primary" />;
          } else {
            return <RemoveCircle color="secondary" />;
          }
        },
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "itineraries",
        headerName: "No. of Itineraries",
        renderCell: (params) => {
          if (params.row.itineraries) {
            return (
              <Chip color="primary" label={params.row.itineraries.length} />
            );
          } else {
            return <Typography>/</Typography>;
          }
        },
        width: 250,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "numberOfBookableSeats",
        headerName: "No. of Bookable Seats",
        width: 250,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "grandTotal",
        headerName: "Total",
        width: 150,
        renderCell: (params) => {
          return (
            <Typography fontWeight="bold">{`${params.row.grandTotal} ${params.row.currency}`}</Typography>
          );
        },
        headerAlign: "center",
        align: "center",
      },
      {
        field: "actions",
        type: "actions",
        flex: 1,
        getActions: (params) => [
          <Link
            className="unstyled-link"
            to={LorienRoutes.ItineraryDetails}
            state={{
              request: requestedData,
              data: params.row,
              prevPath: location.pathname,
            }}
          >
            <Button variant="outlined" endIcon={<ChevronRight />}>
              Details
            </Button>
          </Link>,
        ],
      },
    ],
    [requestedData, location.pathname]
  );

  return (
    <Paper sx={{ height: 450, width: "100%" }}>
      <Box sx={{ minHeight: 450, width: "100%" }}>
        <DataGrid
          sx={{ maxHeight: 450 }}
          disableRowSelectionOnClick
          rows={offers}
          columns={columns}
          getRowId={(row) => row.id}
          hideFooter
        />
      </Box>
    </Paper>
  );
}
