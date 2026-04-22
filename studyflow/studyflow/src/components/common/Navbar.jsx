import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../hooks/useAuth";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
              StudyFlow
            </Typography>
            <Typography
              variant="caption"
              sx={{ opacity: 0.8, display: { xs: "none", sm: "block" } }}
            >
              Smart Study Planner
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <ThemeToggle />

          {isAuthenticated && (
            <>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <Avatar sx={{ width: 36, height: 36 }}>
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </Avatar>

                <Box>
                  <Typography variant="body2" fontWeight={700}>
                    {user?.name || "User"}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {user?.email || ""}
                  </Typography>
                </Box>
              </Stack>

              <Button color="inherit" variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;