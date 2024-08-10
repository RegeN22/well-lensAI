import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/router.tsx";
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { StrictMode, useMemo } from "react";
import { lime, purple } from "@mui/material/colors";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: lime,
          secondary: purple,
        },
      }),
    [prefersDarkMode],
  );
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GoogleOAuthProvider clientId="822580133929-qvu00mf93t8l72nkdh071vm6hptmgqf9.apps.googleusercontent.com">
          <StrictMode>
            <RouterProvider router={appRouter} />
          </StrictMode>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
