import { Box, Skeleton } from "@mui/material";

function Spinner({rows}) {
  return (
    <Box  sx={{
        width: "100%",        
        mt: 2,
      }}>
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          animation="wave"
          height={28}        
          sx={{ mb: 1, borderRadius: 1 ,border:"none"}}
        />
      ))}
    </Box>

  );
}

export default Spinner;
