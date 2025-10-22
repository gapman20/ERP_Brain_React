import { memo } from "react";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SectionTitle = ({ open, children, onClick, isExpanded, disabled }) => {
  const theme = useTheme();

  return (
    <Box
      onClick={!disabled ? onClick : undefined}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        py: 1,
        position: "relative",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        "&:hover .expand-icon": {
          backgroundColor: theme.palette.action.hover,
          borderRadius: "50%",
        },
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          opacity: open ? 1 : 0,
          color: disabled
            ? theme.palette.text.disabled
            : theme.palette.text.secondary,
          transition: theme.transitions.create("opacity"),
          fontSize: "0.90rem",
          textTransform: "uppercase",
        }}
      >
        {children}
      </Typography>

      {!disabled && (
        <Tooltip
          title={`${isExpanded ? "Ocultar" : "Mostrar"} ${children}`}
          placement="right"
        >
          <IconButton
            className="expand-icon"
            size="small"
            sx={{
              position: "absolute",
              right: 8,
              p: 0.5,
              transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
              transition: theme.transitions.create([
                "transform",
                "background-color",
              ]),
              opacity: 1,
              visibility: "visible",
              color: theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: theme.palette.action.selected,
                transform: isExpanded
                  ? "rotate(0deg) scale(1.1)"
                  : "rotate(-90deg) scale(1.1)",
              },
            }}
          >
            <ExpandMoreIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

SectionTitle.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

// Memoize component to prevent unnecessary re-renders
export default memo(SectionTitle);
