import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { GoogleLogin } from "@react-oauth/google";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { googleSignin, loginUser } from "../../services/user-service";

export default function SignIn() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser && JSON.parse(currentUser).username !== "default") {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password: string = form.get("password") as string;
    const email: string = form.get("email") as string;

    if (!password || !email) {
      alert("Please fill all fields");
      return;
    }

    try {
      const user = await loginUser({ email, password });

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate("/home");
      }
    } catch (error) {
      alert(
        (error as { response: { data: { message: string } } })?.response?.data
          ?.message ?? "Something went wrong"
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <GoogleLogin
            onSuccess={async (credRes) => {
              console.log(credRes);
              const res = await googleSignin(credRes);
              localStorage.setItem("currentUser", JSON.stringify(res));
              res._id ? navigate("/home") : console.log(res);
            }}
            onError={() => console.log("Fuck")}
          />
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link onClick={() => navigate("sign-up")} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
