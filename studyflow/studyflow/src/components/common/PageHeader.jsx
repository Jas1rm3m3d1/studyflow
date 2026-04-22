import { Stack, Typography } from "@mui/material";

function PageHeader({ title, subtitle, action = null }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      sx={{ mb: 3 }}
    >
      <Stack spacing={0.5}>
        <Typography variant="h4" fontWeight={700}>
          {title}
        </Typography>

        {subtitle && (
          <Typography color="text.secondary">{subtitle}</Typography>
        )}
      </Stack>

      {action}
    </Stack>
  );
}

export default PageHeader;