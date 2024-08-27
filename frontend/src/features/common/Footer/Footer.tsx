import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  CssBaseline,
  Paper,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import HistoryIcon from "@mui/icons-material/History";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation, useNavigate } from "react-router-dom";

const TabBarButton = styled(BottomNavigationAction)({});
const navigationConfig = [{
  label: 'History',
  path: '/home',
  icon: <HistoryIcon />
},
{
  label: 'Scan',
  path: '/new-scan',
  icon: <LocalSeeIcon />
},
{
  label: 'Profile',
  path: '/profile',
  icon: <PersonIcon />
}
];

export default function Footer() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const locationIndex = navigationConfig.findIndex(({ path }) => location.pathname === path);
    if (locationIndex >= 0) {
      setValue(locationIndex);
    }
  }, [location]);

  return (
    <Box>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={1}
      >
        <BottomNavigation value={value}>
          {navigationConfig.map(({ icon, label, path }) =>
            <TabBarButton
              key={label}
              label={label}
              icon={icon}
              className="bottom-icon"
              onClick={() => navigate(path)} />)}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
