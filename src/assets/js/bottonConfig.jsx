import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const hoverStyles = {
  transform: "translateY(-3px)",
  boxShadow: "0px 5px 15px rgba(93, 171, 255, 0.4)",
};

const baseOutlinedStyles = {
  variant: "outlined",
  borderColor: "primary.contrastText",
  color: "primary.contrastText",
  transition: "all 0.3s ease",
};
export const buttonConfig = {
  alianzas: [
    {
      label: "Agregar",
      startIcon: <PersonAddIcon />,
      variant: "outlined",
      sx: {
        ...baseOutlinedStyles,
        "&:hover": {
          ...hoverStyles,
          backgroundColor: "primary.main",
          borderColor: "primary.main",
          color: "primary.contrastText",
        },
      },
    },
    {
      label: "Eliminar",
      startIcon: <PersonRemoveIcon />,
      variant: "outlined",
      sx: {
        ...baseOutlinedStyles,
        "&:hover": {
          ...hoverStyles,
          backgroundColor: "error.main",
          borderColor: "error.main",
          color: "primary.contrastText",
        },
      },
    },
    {
      label: "Exportar",
      startIcon: <FileDownloadIcon />,
      variant: "outlined",
      sx: {
        ...baseOutlinedStyles,
        "&:hover": {
          ...hoverStyles,
          backgroundColor: "success.main",
          borderColor: "success.main",
          color: "primary.contrastText",
        },
      },
    },
  ],
  clientes: [
    {
      label: "Importar",
      startIcon: <UploadFileIcon />,
      variant: "outlined",
      sx: {
        ...baseOutlinedStyles,
        "&:hover": {
          ...hoverStyles,
          backgroundColor: "success.main",
          borderColor: "success.main",
          color: "primary.contrastText",
        },
      },
    },
    {
      label: "Agregar",
      startIcon: <AddCircleOutlineIcon />,
      variant: "outlined",
      sx: {
        ...baseOutlinedStyles,
        "&:hover": {
          ...hoverStyles,
          backgroundColor: "success.main",
          borderColor: "success.main",
          color: "primary.contrastText",
        },
      },
    },
    {
      label: "Eliminar",
      startIcon: <RemoveCircleOutlineIcon />,
      variant: "outlined",
      sx: {
        ...baseOutlinedStyles,
        "&:hover": {
          ...hoverStyles,
          backgroundColor: "success.main",
          borderColor: "success.main",
          color: "primary.contrastText",
        },
      },
    },
    {
      label: "Exportar",
      variant: "outlined",
      sx: {
        ...baseOutlinedStyles,
        "&:hover": {
          ...hoverStyles,
          backgroundColor: "success.main",
          borderColor: "success.main",
          color: "primary.contrastText",
        },
      },
    },
  ],
};
