import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useState } from "react";
import CreateItemProduct from "./../modules/product/CreateItemProduct";

function Header({ darkMode, setDarkMode, refetchdata }) {
  //  Dialog Create
  const [openCreate, setOpenCreate] = useState(false);
  const handleOpen = () => setOpenCreate(true);
  const handleClose = () => setOpenCreate(false);
  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{ top: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Logo
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#1565c0",
                transform: "translateY(-2px)",
              },
            }}
          >
            Add Product
          </Button>
          {/* Dark mode toggle */}
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            color="inherit"
            sx={{ ml: 1 }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Stack>
      </Toolbar>
      {/* Create Dialog */}
      <CreateItemProduct
        open={openCreate}
        onClose={handleClose}
        onRefetch={refetchdata}
      />
    </AppBar>
  );
}

export default Header;
