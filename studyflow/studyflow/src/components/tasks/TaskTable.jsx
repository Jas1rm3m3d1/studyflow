import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  getPriorityColor,
  getTaskStatusColor,
  isTaskOverdue,
} from "../../utils/taskHelpers";

function TaskTable({ tasks, onEdit, onDelete, onToggleComplete }) {
  return (
    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Subject</strong></TableCell>
              <TableCell><strong>Deadline</strong></TableCell>
              <TableCell><strong>Priority</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((task) => {
              const overdue = isTaskOverdue(task);
              const isCompleted = task.status === "Completed";

              return (
                <TableRow key={task.id}>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography fontWeight={600}>{task.title}</Typography>
                      {task.notes && (
                        <Typography variant="body2" color="text.secondary">
                          {task.notes}
                        </Typography>
                      )}
                    </Stack>
                  </TableCell>

                  <TableCell>{task.subject}</TableCell>

                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography>{task.deadline}</Typography>
                      {overdue && (
                        <Typography variant="caption" color="error">
                          Overdue
                        </Typography>
                      )}
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={task.priority}
                      color={getPriorityColor(task.priority)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={task.status}
                      color={getTaskStatusColor(task.status)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1}
                      alignItems={{ xs: "stretch", sm: "center" }}
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => onEdit(task)}
                      >
                        Edit
                      </Button>

                      {!isCompleted && (
                        <Button
                          size="small"
                          variant="outlined"
                          color="success"
                          onClick={() => onToggleComplete(task.id)}
                        >
                          Complete
                        </Button>
                      )}

                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => onDelete(task.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}

export default TaskTable;