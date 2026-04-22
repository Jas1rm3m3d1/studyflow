import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

function getDifficultyColor(difficulty) {
  if (difficulty === "Easy") return "success";
  if (difficulty === "Medium") return "warning";
  return "error";
}

function SubjectCard({ subject }) {
  return (
    <Card elevation={2} sx={{ height: "100%", borderRadius: 3 }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Stack spacing={0.5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <SchoolIcon color="primary" />
                <Typography variant="h6" fontWeight={700}>
                  {subject.title}
                </Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary">
                {subject.code}
              </Typography>
            </Stack>

            <Chip
              label={subject.difficulty}
              color={getDifficultyColor(subject.difficulty)}
              size="small"
            />
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {subject.description}
          </Typography>

          <Stack spacing={0.5}>
            <Typography variant="body2">
              <strong>Teacher:</strong> {subject.teacher}
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong> {subject.email}
            </Typography>
            <Typography variant="body2">
              <strong>Semester:</strong> {subject.semester}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default SubjectCard;