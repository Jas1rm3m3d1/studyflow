import { useMemo, useState } from "react";
import { Button } from "@mui/material";
import PageHeader from "../components/common/PageHeader";
import TaskForm from "../components/tasks/TaskForm";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskTable from "../components/tasks/TaskTable";
import EmptyState from "../components/common/EmptyState";
import useLocalStorage from "../hooks/useLocalStorage";
import { generateTaskId } from "../utils/taskHelpers";

const priorityOrder = {
  Low: 1,
  Medium: 2,
  High: 3,
};

function TasksPage() {
  const [tasks, setTasks] = useLocalStorage("studyflow_tasks", []);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortValue, setSortValue] = useState("deadline-asc");

  const handleAddOrUpdateTask = (taskData) => {
    if (editingTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id ? { ...taskData, id: editingTask.id } : task
      );

      setTasks(updatedTasks);
      setEditingTask(null);
      setShowForm(false);
      return;
    }

    const newTask = {
      ...taskData,
      id: generateTaskId(),
    };

    setTasks([newTask, ...tasks]);
    setShowForm(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);

    if (editingTask?.id === taskId) {
      setEditingTask(null);
      setShowForm(false);
    }
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: "Completed",
          }
        : task
    );

    setTasks(updatedTasks);
  };

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.subject.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortValue) {
        case "deadline-desc":
          return new Date(b.deadline) - new Date(a.deadline);
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "priority-desc":
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "deadline-asc":
        default:
          return new Date(a.deadline) - new Date(b.deadline);
      }
    });

    return sorted;
  }, [tasks, searchTerm, statusFilter, priorityFilter, sortValue]);

  return (
    <>
      <PageHeader
        title="Tasks"
        subtitle="Track assignments, deadlines, and study progress."
        action={
          <Button
            variant="contained"
            onClick={() => {
              setEditingTask(null);
              setShowForm((prev) => !prev);
            }}
          >
            {showForm ? "Close Form" : "Add Task"}
          </Button>
        }
      />

      {showForm && (
        <TaskForm
          onSubmit={handleAddOrUpdateTask}
          editingTask={editingTask}
          onCancel={() => {
            setEditingTask(null);
            setShowForm(false);
          }}
        />
      )}

      <TaskFilters
        searchTerm={searchTerm}
        onSearchChange={(event) => setSearchTerm(event.target.value)}
        statusFilter={statusFilter}
        onStatusChange={(event) => setStatusFilter(event.target.value)}
        priorityFilter={priorityFilter}
        onPriorityChange={(event) => setPriorityFilter(event.target.value)}
        sortValue={sortValue}
        onSortChange={(event) => setSortValue(event.target.value)}
      />

      {filteredAndSortedTasks.length === 0 ? (
        <EmptyState
          title="No tasks available"
          description="Add your first task or change the filters."
        />
      ) : (
        <TaskTable
          tasks={filteredAndSortedTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      )}
    </>
  );
}

export default TasksPage;