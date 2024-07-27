import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/router.tsx";
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import { lime, purple } from "@mui/material/colors";

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
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </>
  );
}

export default App;
