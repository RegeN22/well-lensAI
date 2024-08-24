import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserSummaryCard from "../../features/user-profile/UserSummaryCard/UserSummaryCard";
import { useCurrentUser } from "../../hooks/user/useCurrentUser";
import { logout } from "../../services/user-service";

export default function ProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const [profile] = useCurrentUser();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      alert(
        (error as { response: { data: { message: string } } })?.response?.data
          ?.message ?? "Something went wrong"
      );
    }
  };

  return (
    <Stack sx={{ padding: "1em" }} spacing={2}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4">Profile</Typography>
      </Box>
      <UserSummaryCard user={profile} />
      <Paper>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleLogout()}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
    </Stack>
  );
}
