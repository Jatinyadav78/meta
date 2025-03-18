import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Container from "@mui/material/Container";
import { motion } from "framer-motion";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLoggingIn) return; // Prevent multiple submissions
    
    if (login === "AUTOSQC" && password === "AUTOSQC") {
      setIsLoggingIn(true);
      
      try {
        // Set token first
        const mockToken = "mock-jwt-token";
        localStorage.setItem("token", mockToken);

        // Show success message
        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome to BPCL Cylinder Quality Control System",
          showConfirmButton: true,
          confirmButtonText: "Go to Dashboard",
          confirmButtonColor: "#28a745",
          background: '#ffffff',
          iconColor: '#28a745',
          allowOutsideClick: false,
          customClass: {
            title: 'swal-title',
            confirmButton: 'swal-button'
          }
        });

        // Navigate after alert is closed
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Navigation error:", error);
        // Clear token if navigation fails
        localStorage.removeItem("token");
        
        Swal.fire({
          icon: "error",
          title: "Navigation Error",
          text: "Please try logging in again",
          confirmButtonColor: "#d33",
        });
      } finally {
        setIsLoggingIn(false);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials",
        text: "Please try using AUTOSQC/AUTOSQC",
        confirmButtonColor: "#d33",
        background: '#ffffff',
        iconColor: '#d33',
        customClass: {
          title: 'swal-title',
          confirmButton: 'swal-button'
        }
      });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Paper 
          elevation={6} 
          sx={{ 
            width: '100%', 
            p: 4, 
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)'
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold', 
              color: '#0056b3', 
              mb: 3,
              textShadow: '0px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Welcome Back
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            align="center" 
            sx={{ mb: 4, color: '#666' }}
          >
            Sign in to access the BPCL Cylinder Quality Control System
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Enter your username (AUTOSQC)"
              required
              disabled={isLoggingIn}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password (AUTOSQC)"
              required
              disabled={isLoggingIn}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      disabled={isLoggingIn}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 4 }}
            />
            
            <Button 
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              fullWidth 
              variant="contained" 
              color="primary"
              size="large"
              disabled={isLoggingIn}
              sx={{ 
                py: 1.5, 
                textTransform: 'none', 
                fontWeight: 'bold',
                borderRadius: 2,
                fontSize: '1rem',
                boxShadow: '0 4px 10px rgba(0,86,179,0.3)',
                background: 'linear-gradient(45deg, #0056b3, #0077cc)',
                '&:hover': {
                  boxShadow: '0 6px 15px rgba(0,86,179,0.4)',
                },
                '&:disabled': {
                  background: 'linear-gradient(45deg, #cccccc, #999999)',
                }
              }}
            >
              {isLoggingIn ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ mt: 3, color: '#666' }}
          >
            
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}