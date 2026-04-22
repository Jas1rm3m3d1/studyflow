import { useState } from "react";
import { Box, Button, Paper, Stack, TextField } from "@mui/material";

function GoalForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Goal title is required.");
      return;
    }

    onSubmit(title.trim());
    setTitle("");
    setError("");
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Daily Goal"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setError("");
            }}
            error={Boolean(error)}
            helperText={error}
            fullWidth
          />

          <Button type="submit" variant="contained">
            Add Goal
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

export default GoalForm;