import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack } from "@mui/material";
import UserSummaryCard from '../../features/user-profile/UserSummaryCard/UserSummaryCard';
import { useCurrentUser } from "../../hooks/user/useCurrentUser";
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../../services/user-service";

export default function ProfilePage(): JSX.Element {
  const [profile] = useCurrentUser();
  return <Stack sx={{ margin: '1em' }} spacing={2}>
    <UserSummaryCard user={profile} />
    <Paper>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => logout()}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  </Stack>;
}