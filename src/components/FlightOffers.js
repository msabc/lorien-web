import { Box, Chip, Paper, Skeleton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";

export default function FlightOffers(props) {
  const { isRequestLoading, offers } = props;

  console.log("offa:", offers);
  const columns = useMemo(
    () => [
      {
        field: "source",
        headerName: "Source",
        width: 180,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "oneway",
        headerName: "One way",
        renderCell: (params) => {
          if (params.row.oneway) {
            return <Chip label="One way" color="success" />;
          } else {
            return <Typography>/</Typography>;
          }
        },
        width: 200,
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
        field: "itineraries",
        headerName: "Date Created",
        width: 150,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "grandTotal",
        headerName: "Total",
        width: 150,
        headerAlign: "center",
        align: "center",
      },
    ],
    []
  );

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      {isRequestLoading ? (
        <Skeleton variant="rectangular" width={210} height={118} />
      ) : (
        <Box sx={{ height: 400, width: "100%" }}>
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                disableSelectionOnClick
                autoHeight
                rows={offers}
                columns={columns}
                getRowId={(row) => row.id}
                hideFooter
              />
            </div>
          </div>
        </Box>
      )}
    </Paper>
  );
}
