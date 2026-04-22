import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useLocation } from "react-router-dom";

export const drawerWidth = 240;

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "Subjects", path: "/subjects", icon: <MenuBookIcon /> },
  { label: "Tasks", path: "/tasks", icon: <TaskAltIcon /> },
  { label: "Goals", path: "/goals", icon: <EmojiEventsIcon /> },
  { label: "Settings", path: "/settings", icon: <SettingsIcon /> },
];

function SidebarContent({ onNavigate }) {
  const location = useLocation();

  return (
    <>
      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mb: 1.5, px: 1 }}
        >
          MAIN NAVIGATION
        </Typography>

        <List>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItemButton
                key={item.path}
                component={Link}
                to={item.path}
                onClick={onNavigate}
                sx={{
                  borderRadius: 2.5,
                  mb: 0.75,
                  bgcolor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "primary.contrastText" : "text.primary",
                  "&:hover": {
                    bgcolor: isActive ? "primary.dark" : "action.hover",
                  },
                  "& .MuiListItemIcon-root": {
                    color: isActive ? "primary.contrastText" : "text.secondary",
                    minWidth: 38,
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </>
  );
}

function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <SidebarContent onNavigate={onClose} />
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    </>
  );
}

export default Sidebar;