
import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import Bpcl from "../images/English_Logo-r.png";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static" elevation={3} sx={{ backgroundColor: "#0056b3" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={Bpcl} 
              alt="BPCL Logo" 
              style={{ 
                height: '50px', 
                marginRight: '16px',
                filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))'
              }} 
            />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                letterSpacing: '0.5px',
                textShadow: '0px 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              BPCL Cylinder Quality Control
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            {isLoggedIn ? (
              <>
                <Button 
                  color="inherit" 
                  onClick={() => navigate("/")} 
                  startIcon={<HomeIcon />}
                  sx={{ 
                    fontWeight: 'bold',
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  HOME
                </Button>
                <Button 
                  color="inherit" 
                  onClick={handleLogout} 
                  startIcon={<LogoutIcon />}
                  sx={{ 
                    fontWeight: 'bold',
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  LOG OUT
                </Button>
              </>
            ) : (
              <Button 
                color="inherit" 
                onClick={() => navigate("/login")} 
                startIcon={<LoginIcon />}
                sx={{ 
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                LOG IN
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}






















