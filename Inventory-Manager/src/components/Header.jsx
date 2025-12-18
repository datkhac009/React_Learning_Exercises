import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { Brightness4, Brightness7, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Header({ darkMode, setDarkMode }) {
  return (
    <AppBar  position="sticky" elevation={2} >
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Logo
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={2} alignItems="center">
          {/* Navigation links nếu cần */}
          <Button color="inherit" component={Link} to="/">
            Products
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
    </AppBar>
  );
}

export default Header;