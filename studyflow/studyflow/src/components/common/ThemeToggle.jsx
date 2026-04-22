import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeModeContext } from "../../context/ThemeContext";

function ThemeToggle() {
  const { mode, toggleTheme } = useThemeModeContext();

  return (
    <IconButton color="inherit" onClick={toggleTheme}>
      {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}

export default ThemeToggle;