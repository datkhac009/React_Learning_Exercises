import { Box, CircularProgress } from "@mui/material";

function Spinner() {
  return (
    <Box
      sx={{
        minHeight: "200px", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Spinner;
