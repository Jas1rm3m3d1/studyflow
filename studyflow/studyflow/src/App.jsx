import AppRoutes from "./app/routes";
import { AuthProvider } from "./context/AuthContext";
import { ThemeModeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeModeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeModeProvider>
  );
}

export default App;