import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        404
      </Typography>
      <Typography sx={{ mb: 2 }}>Page not found.</Typography>
      <Button component={Link} to="/dashboard" variant="contained">
        Go back
      </Button>
    </Box>
  );
}

export default NotFoundPage;