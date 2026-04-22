import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { validateLoginForm } from "../utils/validation";

function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const emailInputRef = useRef(null);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSubmitError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateLoginForm(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const fakeUser = {
        name: formValues.email.split("@")[0],
        email: formValues.email,
      };

      login(fakeUser);
      navigate("/dashboard");
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        p: 2,
        background:
          "linear-gradient(135deg, rgba(25,118,210,0.08), rgba(124,77,255,0.08))",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 450,
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
        }}
      >
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={700}>
            Welcome to StudyFlow
          </Typography>
          <Typography color="text.secondary">
            Sign in to manage your study tasks, subjects, and daily goals.
          </Typography>
        </Stack>

        {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <TextField
              inputRef={emailInputRef}
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={formValues.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={formValues.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />

            <Button type="submit" variant="contained" size="large">
              Login
            </Button>
          </Stack>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          Demo login only. No backend is required for this project.
        </Typography>
      </Paper>
    </Box>
  );
}

export default LoginPage;