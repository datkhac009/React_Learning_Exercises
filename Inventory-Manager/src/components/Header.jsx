import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar position="static" color="primary" elevation={1} borderRadius="16px" sx={{borderBottomRightRadius
    :"10px",borderBottomLeftRadius:"10px"}}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Logo
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={1}>
          

        </Stack>
        
      </Toolbar>
    </AppBar>
  );
}

export default Header;
