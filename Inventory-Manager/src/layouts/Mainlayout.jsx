import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./../components/Header";
import { ToastContainer } from "react-toastify";

function Mainlayout({darkMode, setDarkMode, refetchdata}) {
  return (
    <Box 
      sx={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
      }}
    >
      <ToastContainer
        position="top-center"
        autoClose={800}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss  
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        style={{
          marginTop: '70px'
        }}
      />
      
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        refetchdata={refetchdata}
      />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          overflow: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          py: 3,
          backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: darkMode ? '#1e293b' : '#e2e8f0',
          },
          '&::-webkit-scrollbar-thumb': {
            background: darkMode ? '#475569' : '#cbd5e1',
            borderRadius: '4px',
            '&:hover': {
              background: darkMode ? '#64748b' : '#94a3b8',
            },
          },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Mainlayout;