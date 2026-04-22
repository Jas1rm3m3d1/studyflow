import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

function GoalList({ goals, onToggleComplete, onDelete }) {
  return (
    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
      <List>
        {goals.map((goal) => (
          <ListItem
            key={goal.id}
            divider
            secondaryAction={
              <Button color="error" onClick={() => onDelete(goal.id)}>
                Delete
              </Button>
            }
          >
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: "100%" }}>
              <Checkbox
                checked={goal.completed}
                onChange={() => onToggleComplete(goal.id)}
              />
              <Box>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        textDecoration: goal.completed ? "line-through" : "none",
                        opacity: goal.completed ? 0.7 : 1,
                        fontWeight: 600,
                      }}
                    >
                      {goal.title}
                    </Typography>
                  }
                />
              </Box>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default GoalList;