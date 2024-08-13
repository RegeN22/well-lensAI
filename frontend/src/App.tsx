import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/router.tsx";
import {
  createTheme,
  CssBaseline,
  darkScrollbar,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { useMemo } from "react";
import { green, lime, purple } from "@mui/material/colors";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: { main: "#f2c738" },
          secondary: { main: "#ceca80" },
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
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </>
  );
}

export default App;
