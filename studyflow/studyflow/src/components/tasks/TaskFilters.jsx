import { Box, MenuItem, TextField } from "@mui/material";

function TaskFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  sortValue,
  onSortChange,
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "2fr 1fr 1fr 1fr",
        },
        gap: 2,
        mb: 3,
      }}
    >
      <TextField
        label="Search Tasks"
        value={searchTerm}
        onChange={onSearchChange}
        fullWidth
      />

      <TextField
        select
        label="Status"
        value={statusFilter}
        onChange={onStatusChange}
        fullWidth
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </TextField>

      <TextField
        select
        label="Priority"
        value={priorityFilter}
        onChange={onPriorityChange}
        fullWidth
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
      </TextField>

      <TextField
        select
        label="Sort By"
        value={sortValue}
        onChange={onSortChange}
        fullWidth
      >
        <MenuItem value="deadline-asc">Deadline (Earliest)</MenuItem>
        <MenuItem value="deadline-desc">Deadline (Latest)</MenuItem>
        <MenuItem value="title-asc">Title (A-Z)</MenuItem>
        <MenuItem value="priority-desc">Priority</MenuItem>
      </TextField>
    </Box>
  );
}

export default TaskFilters;