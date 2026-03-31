import { memo } from "react";
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
import PropTypes from "prop-types";

const AnimatedListItemButton = styled(ListItemButton)(({ theme }) => ({
  minHeight: 48,
  px: 2.5,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateX(5px)",
    backgroundColor: theme.palette.action.hover,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
  },
  "&:active": {
    transform: "scale(1.02)",
  },
}));

const MenuList = ({ menuItems, open, context, module, onItemClick, isMobile }) => {
  const location = useLocation();

  const handleClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <List>
      {menuItems.map((item) => {
        const hasPermission =
          !item.permission || context.permissions.includes(item.permissions);
        const routePath = `/${module}/${item.text.toLowerCase().replace(/\s+/g, "-")}`;
        const isActive = location.pathname === routePath;
        if (!hasPermission) return null;
        return (
          <ListItem
            key={item.text}
            disablePadding
            sx={{ display: "block" }}
          >
            <Tooltip
              title={item.text}
              placement="right"
              arrow
              disableHoverListener={open || isMobile}
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
                onClick={handleClick}
                sx={[
                  open
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
                  isActive && {
                    backgroundColor: "primary.light",
                    color: "primary.contrastText",
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
                    isActive && {
                      color: "primary.contrastText",
                      "&:hover":{
                        color:"primary.lihgt",
                      }
                    },
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

MenuList.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      permission: PropTypes.string,
    })
  ).isRequired,
  open: PropTypes.bool.isRequired,
  context: PropTypes.shape({
    permissions: PropTypes.object,
  }).isRequired,
  module: PropTypes.string.isRequired,
  onItemClick: PropTypes.func,
  isMobile: PropTypes.bool,
};

// Memoize component to prevent unnecessary re-renders
export default memo(MenuList);
