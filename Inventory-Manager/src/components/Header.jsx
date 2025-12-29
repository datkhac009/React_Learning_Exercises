import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { Brightness4, Brightness7, Add } from "@mui/icons-material";
import { useState } from "react";
import CreateItemProduct from "./../modules/product/CreateItemProduct";

function Header({ darkMode, setDarkMode, refetchdata }) {
  const [openCreate, setOpenCreate] = useState(false);
  const handleOpen = () => setOpenCreate(true);
  const handleClose = () => setOpenCreate(false);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: darkMode
          ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
          : "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
        borderBottom: "1px solid",
        borderColor: darkMode
          ? "rgba(255,255,255,0.1)"
          : "rgba(255,255,255,0.2)",
      }}
    >
      <Toolbar
        sx={{ gap: { xs: 1, sm: 2 }, py: { xs: 1, sm: 1.5 }, flexWrap: "wrap" }}
      >
        <Typography
          variant="h5"
          sx={{
            background:
              "linear-gradient(45deg, #fff 30%, rgba(255,255,255,0.8) 90%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 800,
            letterSpacing: "0.5px",
            fontSize: { xs: "1.1rem", sm: "1.4rem" },
          }}
        >
          Inventory
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 1.5 }}
          alignItems="center"
          sx={{ flexWrap: "wrap" }}
        >
          <Button
            onClick={handleOpen}
            variant="contained"
            startIcon={<Add />}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              color: "white",
              fontWeight: 600,
              textTransform: "none",
              px: { xs: 1.5, sm: 3 },
              py: { xs: 0.75, sm: 1 },
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
              borderRadius: 2,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            Add Product
          </Button>

          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            sx={{
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                transform: "rotate(180deg)",
              },
            }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Stack>
      </Toolbar>

      <CreateItemProduct
        open={openCreate}
        onClose={handleClose}
        onRefetch={refetchdata}
      />
    </AppBar>
  );
}

export default Header;
