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

const MenuList = ({ menuItems, open, context }) => {
  return (
     <List>
      {menuItems.map((item) => {
        // Ejemplo: deshabilitar items según rol
        const disabled = item.text === "Layouts" && context.user.role !== "admin";
        
        return (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
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
          </ListItem>
        );
      })}
    </List>
/*     <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
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
        </ListItem>
      ))}
    </List> */
  );
};

export default MenuList;
