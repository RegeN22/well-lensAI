import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { GoogleLogin } from "@react-oauth/google";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { googleSignin, loginUser } from "../../services/user-service";
import { Paper, Stack } from "@mui/material";

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
    <Stack direction='column' alignItems='center' justifyContent='center' maxWidth='xs' spacing={3} sx={{ height: '100vh', margin: '0 1em' }}>
      <Stack alignItems='center'>
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h5" variant="h5">
          Welcome back
        </Typography>
        <Typography component="p" variant="subtitle2">
          Enter your credentials to sign in
        </Typography>
      </Stack>
      <Paper component="form" onSubmit={handleSubmit} noValidate sx={{ padding: '1em' }}>
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
        >Sign In</Button>
        <Stack alignItems='center' spacing={1} sx={{marginTop: '1em'}}>
          <Link onClick={() => navigate("sign-up")} variant="body1">
            Don't have an account? Sign Up
          </Link>
          <Typography variant="body1">or</Typography>
          <GoogleLogin
            theme="filled_blue"
            onSuccess={async (credRes) => {
              console.log(credRes);
              const res = await googleSignin(credRes);
              localStorage.setItem("currentUser", JSON.stringify(res));
              res._id ? navigate("/home") : console.log(res);
            }}
            onError={() => console.log("Fuck")}
          />
        </Stack>
      </Paper>
    </Stack>
  );
}
