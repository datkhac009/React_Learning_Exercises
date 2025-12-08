import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";

function Header({ search, onSearchChange }) {
  return (
    <AppBar position="static" color="primary" elevation={1} borderRadius="16px" sx={{borderBottomRightRadius
    :"10px",borderBottomLeftRadius:"10px"}}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Logo
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={1}>
          <Button
            component={NavLink}
            to="/listitem"
            color="inherit"
            sx={{
              textTransform: "none",
              "&.active": {
                fontWeight: "bold",
                borderBottom: "2px solid #fff",
                borderRadius: 0,
              },
            }}
          >
            Product
          </Button>

          <Button
            component={NavLink}
            to="/create"
            color="inherit"
            sx={{
              textTransform: "none",
              "&.active": {
                fontWeight: "bold",
                borderBottom: "2px solid #fff",
                borderRadius: 0,
              },
            }}
          >
            Create
          </Button>
        </Stack>

        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            px: 1,
            py: 0.5,
            borderRadius: 2,
            minWidth: 260,
          }}
        >
          <SearchIcon fontSize="small" />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search products..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Paper>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
