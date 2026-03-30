import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";

export const drawerWidth = 250;

export const styles = {
  body: {
    width: "100%",
    minHeight: "140px",
    background: "linear-gradient(to bottom, #1E7FE3, #5DABFF)",
    padding: "16px",
    position: "relative",
    overflow: "visible",
    zIndex: 2,
  },
};

export const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    duration: 350,
  }),
  overflowX: "hidden",
  willChange: "width",
});

export const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    duration: 300,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  willChange: "width",
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    duration: 300,
  }),
  willChange: "width, margin",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          duration: 350,
        }),
      },
    },
  ],
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.background.paper,
    backfaceVisibility: "hidden",
    transform: "translateZ(0)",
  },
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));
