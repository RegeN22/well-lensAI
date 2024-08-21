import {
  createTheme,
  CssBaseline,
  darkScrollbar,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/router.tsx";
import bgImage from './assets/bg.png';
import bgImageDark from './assets/bg-dark.png';

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: { main: "#5f6d63", light: "#9caca1", dark: '#404d44', contrastText: "white", },
          secondary: { main: "#c3f65d", light: "#dcfba3", dark: '#a1c929', contrastText: "black", },
          error: { main: "#D64D4F" },
          success: { main: "#318300" },
          warning: { main: "#ffbf00" },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: (themeParam) => ({
              body: {
                ...(themeParam.palette.mode === "dark" ? darkScrollbar() : {}),
                backgroundImage: themeParam.palette.mode === "dark" ? `url(${bgImageDark})` : `url(${bgImage})`,
              },
            }),
          },
          MuiPaper: {
            styleOverrides: {
              root: ({theme}) => ({
                backgroundColor: theme.palette.mode === 'dark' ? '#00000088' : '#ffffff88',
                backdropFilter: 'blur(2px)'
              })
            }
          }
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
