import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useMemo } from "react";
import Loading from "../../../components/Loading";
import { CheckCircle, ChevronRight, RemoveCircle } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { LorienRoutes } from "../../../data/constants/LorienRoutes";

export default function FlightOffers(props) {
  const { isRequestLoading, offers } = props;
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
        field: "numberOfBookableSeats",
        headerName: "No. of Bookable Seats",
        width: 150,
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
            to={LorienRoutes.Itinerary}
            state={{
              data: params.row,
              prevPath: location.pathname,
            }}
          >
            <Button variant="outlined" endIcon={<ChevronRight />}>
              Details
            </Button>
          </Link>
        ],
      },
    ],
    [location.pathname]
  );

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      {isRequestLoading === true ? (
        <Loading />
      ) : (
        <Box sx={{ height: 400, width: "100%" }}>
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                disableSelectionOnClick
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
