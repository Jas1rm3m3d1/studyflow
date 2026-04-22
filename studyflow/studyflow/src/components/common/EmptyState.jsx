import { Paper, Stack, Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";

function EmptyState({ title, description }) {
  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 3,
        textAlign: "center",
        border: "1px dashed",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Stack spacing={1.5} alignItems="center">
        <InboxIcon color="disabled" sx={{ fontSize: 40 }} />
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>
        <Typography color="text.secondary">{description}</Typography>
      </Stack>
    </Paper>
  );
}

export default EmptyState;