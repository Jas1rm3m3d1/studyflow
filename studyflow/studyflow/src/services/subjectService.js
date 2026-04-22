import api from "../api/axios";

export async function getSubjects() {
  const response = await api.get("/users");

  const users = response.data.users ?? [];

  return users.map((user, index) => ({
    id: user.id,
    title: `${user.company?.department || "General"} Studies`,
    code: `SUB-${String(index + 1).padStart(3, "0")}`,
    teacher: `${user.firstName} ${user.lastName}`,
    email: user.email,
    semester: index % 2 === 0 ? "Spring" : "Fall",
    difficulty: ["Easy", "Medium", "Hard"][index % 3],
    description: `A structured subject focused on ${user.company?.department?.toLowerCase() || "general academic development"} and study planning.`,
  }));
}