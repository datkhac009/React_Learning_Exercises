import { Box, Paper, Typography, Button, Stack } from "@mui/material";

export default function StateError({ error }) {
  const msg =
    error?.message ||
    "Cannot connect to server. Please start json-server to continue.";

  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "grid",
        placeItems: "center",
        marginTop:"10rem"
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: { xs: 3, sm: 4 },
          width: "min(680px, 100%)",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight={800} color="error" gutterBottom>
          Cannot connect to server
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Please start json-server to load products.
        </Typography>

        <Typography
          variant="caption"
          sx={{ display: "block", color: "text.secondary", mb: 3 }}
        >
          {msg}
        </Typography>
      </Paper>
    </Box>
  );
}
