import { useMemo } from "react";
import { LinearProgress, Paper, Stack, Typography } from "@mui/material";
import PageHeader from "../components/common/PageHeader";
import GoalForm from "../components/goals/GoalForm";
import GoalList from "../components/goals/GoalList";
import EmptyState from "../components/common/EmptyState";
import useLocalStorage from "../hooks/useLocalStorage";

function GoalsPage() {
  const [goals, setGoals] = useLocalStorage("studyflow_goals", []);

  const handleAddGoal = (title) => {
    const newGoal = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    setGoals([newGoal, ...goals]);
  };

  const handleToggleComplete = (goalId) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    );

    setGoals(updatedGoals);
  };

  const handleDeleteGoal = (goalId) => {
    const filteredGoals = goals.filter((goal) => goal.id !== goalId);
    setGoals(filteredGoals);
  };

  const progress = useMemo(() => {
    if (goals.length === 0) return 0;

    const completedGoals = goals.filter((goal) => goal.completed).length;
    return Math.round((completedGoals / goals.length) * 100);
  }, [goals]);

  return (
    <>
      <PageHeader
        title="Daily Goals"
        subtitle="Set small goals and track your daily study progress."
      />

      <GoalForm onSubmit={handleAddGoal} />

      <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Stack spacing={1.5}>
          <Typography variant="h6" fontWeight={700}>
            Daily Progress
          </Typography>
          <Typography color="text.secondary">
            {progress}% of your goals completed
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 10, borderRadius: 999 }}
          />
        </Stack>
      </Paper>

      {goals.length === 0 ? (
        <EmptyState
          title="No goals yet"
          description="Add your first daily goal to start tracking progress."
        />
      ) : (
        <GoalList
          goals={goals}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteGoal}
        />
      )}
    </>
  );
}

export default GoalsPage;