import dayjs from "dayjs";

export function generateTaskId() {
  return Date.now().toString();
}

export function isTaskOverdue(task) {
  if (!task.deadline || task.status === "Completed") return false;
  return dayjs(task.deadline).isBefore(dayjs(), "day");
}

export function getTaskStatusColor(status) {
  if (status === "Completed") return "success";
  if (status === "In Progress") return "warning";
  return "default";
}

export function getPriorityColor(priority) {
  if (priority === "High") return "error";
  if (priority === "Medium") return "warning";
  return "info";
}