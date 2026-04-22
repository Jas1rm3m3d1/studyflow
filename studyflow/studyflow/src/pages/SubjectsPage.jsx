import { useEffect, useMemo, useState } from "react";
import { Alert, CircularProgress, Paper, Box } from "@mui/material";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import SortSelect from "../components/common/SortSelect";
import EmptyState from "../components/common/EmptyState";
import SubjectsList from "../components/subjects/SubjectsList";
import { getSubjects } from "../services/subjectService";

const sortOptions = [
  { value: "title-asc", label: "Title (A-Z)" },
  { value: "title-desc", label: "Title (Z-A)" },
  { value: "teacher-asc", label: "Teacher (A-Z)" },
  { value: "difficulty-asc", label: "Difficulty" },
];

const difficultyOrder = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("title-asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadSubjects() {
      try {
        setLoading(true);
        setError("");

        const data = await getSubjects();

        if (isMounted) {
          setSubjects(data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load subjects. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadSubjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredAndSortedSubjects = useMemo(() => {
    const filtered = subjects.filter((subject) => {
      const q = searchTerm.trim().toLowerCase();

      if (!q) return true;

      return (
        subject.title.toLowerCase().includes(q) ||
        subject.teacher.toLowerCase().includes(q) ||
        subject.code.toLowerCase().includes(q) ||
        subject.semester.toLowerCase().includes(q)
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortValue) {
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "teacher-asc":
          return a.teacher.localeCompare(b.teacher);
        case "difficulty-asc":
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case "title-asc":
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return sorted;
  }, [subjects, searchTerm, sortValue]);

  return (
    <>
      <PageHeader
        title="Subjects"
        subtitle="Browse your subjects, search quickly, and sort them efficiently."
      />

      <Paper sx={{ p: 2, borderRadius: 3, mb: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 2,
          }}
        >
          <SearchBar
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by title, teacher, code, or semester..."
          />

          <SortSelect
            value={sortValue}
            onChange={(event) => setSortValue(event.target.value)}
            label="Sort By"
            options={sortOptions}
          />
        </Box>
      </Paper>

      {loading && (
        <Paper sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <CircularProgress />
        </Paper>
      )}

      {!loading && error && (
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && filteredAndSortedSubjects.length === 0 && (
        <EmptyState
          title="No subjects found"
          description="Try changing the search text or sort option."
        />
      )}

      {!loading && !error && filteredAndSortedSubjects.length > 0 && (
        <SubjectsList subjects={filteredAndSortedSubjects} />
      )}
    </>
  );
}

export default SubjectsPage;