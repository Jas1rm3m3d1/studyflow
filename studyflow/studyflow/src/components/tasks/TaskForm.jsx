import { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

const initialForm = {
  title: "",
  subject: "",
  deadline: "",
  priority: "Medium",
  status: "Pending",
  notes: "",
};

function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [deadlineInputType, setDeadlineInputType] = useState("text");

  useEffect(() => {
    if (editingTask) {
      setFormData(editingTask);
      setDeadlineInputType("date");
    } else {
      setFormData(initialForm);
      setDeadlineInputType("text");
    }
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Task title is required.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.deadline) newErrors.deadline = "Deadline is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    onSubmit(formData);

    if (!editingTask) {
      setFormData(initialForm);
      setDeadlineInputType("text");
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Task Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={Boolean(errors.title)}
            helperText={errors.title}
            fullWidth
          />

          <TextField
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            error={Boolean(errors.subject)}
            helperText={errors.subject}
            fullWidth
          />

          <TextField
            label="Deadline"
            name="deadline"
            type={deadlineInputType}
            value={formData.deadline}
            onChange={handleChange}
            onFocus={() => setDeadlineInputType("date")}
            onBlur={() => {
              if (!formData.deadline) {
                setDeadlineInputType("text");
              }
            }}
            placeholder="Select deadline"
            error={Boolean(errors.deadline)}
            helperText={errors.deadline}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            select
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>

          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>

          <TextField
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            multiline
            minRows={3}
            fullWidth
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button type="submit" variant="contained">
              {editingTask ? "Update Task" : "Add Task"}
            </Button>

            {editingTask && (
              <Button variant="outlined" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}

export default TaskForm;