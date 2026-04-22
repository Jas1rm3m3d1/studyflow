import { Paper, Stack, Typography, Divider, Chip } from "@mui/material";
import PageHeader from "../components/common/PageHeader";
import { useThemeModeContext } from "../context/ThemeContext";
import { useAuth } from "../hooks/useAuth";

function SettingsPage() {
  const { mode } = useThemeModeContext();
  const { user } = useAuth();

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage your account and app preferences."
      />

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={700}>
            Account Information
          </Typography>

          <Typography>
            <strong>Name:</strong> {user?.name || "-"}
          </Typography>

          <Typography>
            <strong>Email:</strong> {user?.email || "-"}
          </Typography>

          <Divider />

          <Typography variant="h6" fontWeight={700}>
            App Preferences
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>
              <strong>Theme mode:</strong>
            </Typography>
            <Chip label={mode} color="primary" size="small" />
          </Stack>

          <Typography color="text.secondary">
            Theme mode can be changed from the top navigation bar.
          </Typography>

          <Divider />

          <Typography variant="h6" fontWeight={700}>
            About StudyFlow
          </Typography>

          <Typography color="text.secondary">
            StudyFlow is a smart study planner built with React, Material UI,
            React Router, Context API, Axios, and localStorage persistence.
          </Typography>
        </Stack>
      </Paper>
    </>
  );
}

export default SettingsPage;