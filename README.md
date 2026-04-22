# StudyFlow

StudyFlow is a React web application that helps students organize their study tasks, deadlines, subjects, and daily goals in a clean and simple interface.

## Features

- Login form with demo authentication
- Protected routes
- Dashboard with study statistics
- Subjects page with API fetch
- Tasks page with add, edit, delete, complete, search, filter, and sort
- Daily goals page with progress tracking
- Dark and light mode
- Responsive design for desktop and mobile
- Data saved in localStorage

## Tech Stack

- React
- JavaScript
- Vite
- React Router DOM
- Material UI
- Axios
- Day.js
- LocalStorage

## Project Setup

1. Clone the repository

```bash
git clone https://github.com/Jas1rm3m3d1/studyflow.git
cd studyflow

2. Install dep
npm install

3. Run project
npm run dev

3. Open in borwser
http://localhost:5173

Main packages:

npm install react-router-dom axios @mui/material @emotion/react @emotion/styled @mui/icons-material dayjs

## Project Stucture

src/
  api/
    axios.js

  app/
    routes.jsx

  components/
    auth/
      ProtectedRoute.jsx
    common/
      AppLayout.jsx
      Navbar.jsx
      Sidebar.jsx
      PageHeader.jsx
      ThemeToggle.jsx
      EmptyState.jsx
      SearchBar.jsx
      SortSelect.jsx
    dashboard/
      StatsCard.jsx
    goals/
      GoalForm.jsx
      GoalList.jsx
    subjects/
      SubjectCard.jsx
      SubjectsList.jsx
    tasks/
      TaskForm.jsx
      TaskFilters.jsx
      TaskTable.jsx

  context/
    AuthContext.jsx
    ThemeContext.jsx

  hooks/
    useAuth.js
    useLocalStorage.js

  pages/
    LoginPage.jsx
    DashboardPage.jsx
    SubjectsPage.jsx
    TasksPage.jsx
    GoalsPage.jsx
    SettingsPage.jsx
    NotFoundPage.jsx

  services/
    subjectService.js

  utils/
    validation.js
    taskHelpers.js

  styles/
    globals.css

  App.jsx
  main.jsx

How It Works
The login page stores a demo token and user info in localStorage
Protected routes allow access only when the user is logged in
Subjects are fetched from DummyJSON using Axios
Tasks are stored in localStorage and displayed in a dynamic table
Goals are stored in localStorage and tracked with a progress bar
Theme mode is managed with Context API

React Concepts Used
Reusable components
Props
Event handling
Functions passed as props
useState
useEffect
useRef
useMemo
useContext
Conditional rendering
Controlled forms
Routing with React Router
API fetching with Axios

Notes

This project is frontend only.
DummyJSON is used for fake API data and localStorage is used for persistence.

Author

Jasir Memedi
