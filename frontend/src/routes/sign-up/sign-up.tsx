import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../models";
import { registerUser } from "../../services/user-service";
import { Paper, Stack } from "@mui/material";

export default function SignUp() {
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
    const repeatPassword = form.get("repeat-password") as string;
    const user: UserModel = {
      email: form.get("email") as string,
      username: form.get("username") as string,
      password: form.get("password") as string,
      firstName: form.get("firstName") as string,
      lastName: form.get("lastName") as string,
      imgUrl: "",
    };

    const isInvalid: boolean =
      user.username === "" ||
      user.firstName === "" ||
      user.lastName === "" ||
      user.email === "" ||
      user.password === "" ||
      repeatPassword === "";

    const isPassInvalid: boolean = user.password !== repeatPassword;

    if (isInvalid) {
      alert("Please fill all fields");
      return;
    }

    if (isPassInvalid) {
      alert("Passwords do not match");
      return;
    }

    let registeredUser: UserModel;

    try {
      registeredUser = await registerUser(user);
      if (registeredUser) {
        localStorage.setItem("currentUser", JSON.stringify(registeredUser));
        navigate("/home");
      } else {
        alert("Something went wrong");
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
          Sign up
        </Typography>
        <Typography component="p" variant="subtitle2">
          Create your account
        </Typography>
      </Stack>
      <Paper component="form" noValidate onSubmit={handleSubmit} sx={{ padding: '1em' }}>
        <TextField
          autoComplete="given-name"
          name="firstName"
          required
          fullWidth
          margin="normal"
          id="firstName"
          label="First Name"
          autoFocus
        />
        <TextField
          required
          fullWidth
          margin="normal"
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
        />
        <TextField
          autoComplete="username"
          name="username"
          required
          fullWidth
          margin="normal"
          id="username"
          label="Username"
        />
        <TextField
          required
          fullWidth
          margin="normal"
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <TextField
          required
          fullWidth
          margin="normal"
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
        />
        <TextField
          required
          fullWidth
          margin="normal"
          name="repeat-password"
          label="Repeat Password"
          type="password"
          id="password"
          autoComplete="new-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Container sx={{ textAlign: 'center' }}>
          <Link href='' onClick={() => navigate("/")} variant="body1">
            Already have an account? Sign in
          </Link>
        </Container>
      </Paper>
    </Stack>
  );
}
