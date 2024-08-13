import {
  createTheme,
  CssBaseline,
  darkScrollbar,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { lime, purple } from "@mui/material/colors";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/router.tsx";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: lime,
          secondary: purple,
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: (themeParam) => ({
              body: themeParam.palette.mode === "dark" ? darkScrollbar() : null,
            }),
          },
        },
      }),
    [prefersDarkMode]
  );
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GoogleOAuthProvider clientId="822580133929-qvu00mf93t8l72nkdh071vm6hptmgqf9.apps.googleusercontent.com">
          <RouterProvider router={appRouter} />
        </GoogleOAuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
