import { useMemo } from "react";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import PageHeader from "../components/common/PageHeader";
import StatsCard from "../components/dashboard/StatsCard";
import EmptyState from "../components/common/EmptyState";
import useLocalStorage from "../hooks/useLocalStorage";
import { isTaskOverdue } from "../utils/taskHelpers";
import { useAuth } from "../hooks/useAuth";

function DashboardPage() {
  const { user } = useAuth();
  const [tasks] = useLocalStorage("studyflow_tasks", []);
  const [goals] = useLocalStorage("studyflow_goals", []);

  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (task) => task.status === "Completed"
    ).length;
    const pendingTasks = tasks.filter(
      (task) => task.status === "Pending" || task.status === "In Progress"
    ).length;
    const overdueTasks = tasks.filter((task) => isTaskOverdue(task)).length;

    const totalGoals = goals.length;
    const completedGoals = goals.filter((goal) => goal.completed).length;

    const goalsProgress =
      totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);

    const recentTasks = [...tasks].slice(0, 5);

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      totalGoals,
      completedGoals,
      goalsProgress,
      recentTasks,
    };
  }, [tasks, goals]);

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Get a quick overview of your tasks, goals, and study progress."
      />

      <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Stack spacing={1}>
          <Typography variant="h5" fontWeight={800}>
            Welcome back, {user?.name || "Student"} 👋
          </Typography>
          <Typography color="text.secondary">
            Stay consistent and keep your study plan organized.
          </Typography>
        </Stack>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            lg: "1fr 1fr 1fr",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <StatsCard
          title="Total Tasks"
          value={stats.totalTasks}
          subtitle="All study tasks you created"
        />
        <StatsCard
          title="Completed Tasks"
          value={stats.completedTasks}
          subtitle="Finished successfully"
        />
        <StatsCard
          title="Pending Tasks"
          value={stats.pendingTasks}
          subtitle="Still in progress or pending"
        />
        <StatsCard
          title="Overdue Tasks"
          value={stats.overdueTasks}
          subtitle="Deadlines already passed"
        />
        <StatsCard
          title="Total Goals"
          value={stats.totalGoals}
          subtitle="Daily goals created"
        />
        <StatsCard
          title="Goals Progress"
          value={`${stats.goalsProgress}%`}
          subtitle="Completed daily goals"
        />
      </Box>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={700}>
            Recent Tasks
          </Typography>

          {stats.recentTasks.length === 0 ? (
            <EmptyState
              title="No recent tasks"
              description="Create a few tasks and they will appear here."
            />
          ) : (
            <Stack spacing={1.5}>
              {stats.recentTasks.map((task) => (
                <Paper
                  key={task.id}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={1.5}
                  >
                    <Stack spacing={0.5}>
                      <Typography fontWeight={700}>{task.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {task.subject} • Deadline: {task.deadline}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Chip label={task.priority} size="small" color="primary" />
                      <Chip label={task.status} size="small" />
                      {isTaskOverdue(task) && (
                        <Chip label="Overdue" size="small" color="error" />
                      )}
                    </Stack>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          )}
        </Stack>
      </Paper>
    </>
  );
}

export default DashboardPage;