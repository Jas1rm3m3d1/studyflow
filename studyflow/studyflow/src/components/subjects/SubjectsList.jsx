import { Box } from "@mui/material";
import SubjectCard from "./SubjectCard";

function SubjectsList({ subjects }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          lg: "1fr 1fr 1fr",
        },
        gap: 2,
      }}
    >
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))}
    </Box>
  );
}

export default SubjectsList;