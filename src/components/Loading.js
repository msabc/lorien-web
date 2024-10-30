import { Box, LinearProgress, Stack, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Stack
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      m={10}
      spacing={6}
    >
      <Typography variant="body1">Loading...</Typography>
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </Stack>
  );
}
