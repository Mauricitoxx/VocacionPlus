import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Bar.css";
import { 
    AppBar, Box, Toolbar, Typography, IconButton, 
    MenuItem, Menu, Drawer, List, ListItem, 
    ListItemButton, ListItemText, Dialog // Importamos Dialog
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginModal from "./LoginModal"; // Importa el componente de Login como Modal
// Bar.jsx

export default function Bar() {
  // Opciones del menú (Drawer)
  const routes = [
    { text: "Facultades", path: "/facultad" },
    { text: "Carreras", path: "/carrera" },
    { text: "Usuario", path: "/usuario" }, 
    { text: "Registro", path: "/register" },
  ];

  // Cambiamos el estado inicial de 'auth' a false (no logueado) para probar el login.
const [auth, setAuth] = useState(false); // setAuth es la variable no utilizada
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openLogin, setOpenLogin] = React.useState(false); // Estado para el Login Modal

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Manejadores del Modal de Login
  const handleOpenLogin = () => {
    setAnchorEl(null); 
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };
  
  // Función que se ejecuta al hacer clic en el icono de cuenta
  const handleAccountIconClick = (event) => {
    if (auth) {
      // Si está autenticado, abre el menú desplegable
      handleMenu(event);
    } else {
      // Si NO está autenticado, abre el popup de Login
      handleOpenLogin();
    }
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="box">
      <AppBar position="static" className="bar">
        <Toolbar>
          <IconButton
            className="menu-boton"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          
          {/* Drawer (Menú Lateral) */}
          <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
            <Box className="nav" sx={{
              bgcolor: "var(--primary-500)",
              color: "var(--white)",
              height: "100%",
              width: 250 
            }}>
              <List>
                {routes.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton component={Link} to={item.path} onClick={toggleDrawer(false)}
                      sx={{
                        textAlign: "center",
                        padding: '16px 8px',
                        borderBottom: '1px solid var(--black)', 
                        "&:hover": {
                          backgroundColor: "var(--primary-400)",
                        }
                      }}
                    >
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          <Typography className="titulo" variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
            Vocación Plus
          </Typography>

          {/* Icono de Cuenta: Usa la función condicional handleAccountIconClick */}
          <div>
            <IconButton
              className="menu-boton"
              size="large"
              aria-label={auth ? "account of current user" : "login"}
              aria-controls={auth ? "menu-appbar" : undefined}
              aria-haspopup={auth ? "true" : undefined}
              onClick={handleAccountIconClick} // **AQUÍ ESTÁ EL CAMBIO CLAVE**
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            {/* Menú desplegable, SOLO se renderiza si el usuario está autenticado */}
            {auth && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            )}
          </div>
          
        </Toolbar>
      </AppBar>
      
      {/* Login Popup (Dialog) */}
      <Dialog open={openLogin} onClose={handleCloseLogin}>
        {/* Renderiza el componente de Login dentro del Dialog */}
        <LoginModal handleClose={handleCloseLogin} />
      </Dialog>
    </Box>
  );
}
