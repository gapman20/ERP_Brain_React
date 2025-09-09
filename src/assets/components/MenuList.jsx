import React from "react";
import Tooltip from "@mui/material/Tooltip"; // Nos funciona para que la hacer hover sobre un elemento se muestre un texto
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";

const AnimatedListItemButton = styled(ListItemButton)(({ theme }) => ({
  minHeight: 48,
  px: 2.5,
  transition: "all 0.3s ease", // Animación suave para todas las propiedades
  "&:hover": {
    transform: "translateX(5px)", // Desplaza 5px a la derecha
    backgroundColor: theme.palette.action.hover, // Color de hover del tema
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main, // Cambia color del ícono al hover
    },
  },
  "&:active": {
    // Efecto al hacer clic
    transform: "scale(1.02)", // Aumenta ligeramente el tamaño
  },
}));

const MenuList = ({ menuItems, open, context, module }) => {
  const location = useLocation();

  return (
    <List>
      {menuItems.map((item) => {
        const hasPermission =
          !item.permission || { context }.permissions[item.permission];
        const routePath = `/${module}/${item.text.toLowerCase().replace(/\s+/g, "-")}`;
        const isActive = location.pathname === routePath;
        return (
          <ListItem
            key={item.text}
            disablePadding
            sx={{ display: "block" }}
            disabled={!hasPermission}
          >
            <Tooltip
              title={item.text}
              placement="right"
              arrow
              disableHoverListener={open}
              componentsProps={{
                tooltip: {
                  sx: {
                    fontSize: "1rem", // Tamaño más grande (16px)
                    fontWeight: 500, // Grosor medio
                  },
                },
              }}
            >
              <AnimatedListItemButton
                component={Link}
                to={routePath}
                sx={[
                  open
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
                  isActive && {
                    backgroundColor: "primary.light",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open ? { mr: 3 } : { mr: "auto" },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
              </AnimatedListItemButton>
            </Tooltip>
          </ListItem>
        );
      })}
    </List>
  );
};

export default MenuList;
