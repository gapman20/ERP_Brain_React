import React from "react";
import Tooltip from "@mui/material/Tooltip";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";


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

const MenuList = ({ menuItems, open }) => {
  return (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? { justifyContent: "initial" }
                : { justifyContent: "center" },
            ]}
          >
            <Tooltip
              title={item.text}
              placement="right"
              arrow
              disableHoverListener={open}
              componentsProps={{
                tooltip: {
                  sx: {
                    fontSize: "1rem", 
                    fontWeight: 500, 
                  },
                },
              }}
            >
              <AnimatedListItemButton 
                sx={[
                  open
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
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
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default MenuList;
