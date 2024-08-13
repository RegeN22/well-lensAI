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
<<<<<<< HEAD
import {
  createTheme,
  CssBaseline,
  darkScrollbar,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { useMemo } from "react";
import { green, lime, purple } from "@mui/material/colors";
=======
>>>>>>> 9b8be5cf6c94e05484f4aeffdce7840219a3d0ab

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
<<<<<<< HEAD
          primary: { main: "#404d44" },
          secondary: { main: "#e3e4d7" },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: (themeParam) => ({
              body: themeParam.palette.mode === "dark" ? darkScrollbar() : null,
            }),
          },
=======
          primary: lime,
          secondary: purple,
>>>>>>> 9b8be5cf6c94e05484f4aeffdce7840219a3d0ab
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
