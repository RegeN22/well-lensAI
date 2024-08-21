import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  CssBaseline,
  Paper,
  styled,
} from "@mui/material";
import { useState } from "react";
import HistoryIcon from "@mui/icons-material/History";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const TabBarButton = styled(BottomNavigationAction)({});

export default function Footer() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  return (
    <Box>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={1}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <TabBarButton
            label="History"
            className="bottom-icon"
            icon={<HistoryIcon />}
            onClick={() => navigate("/home")}
          />
          <TabBarButton
            label="Scan"
            className="bottom-icon"
            icon={<LocalSeeIcon />}
            onClick={() => navigate("/home/new")}
          />
          <TabBarButton
            label="Profile"
            className="bottom-icon"
            icon={<PersonIcon />}
            onClick={() => navigate("/profile")}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
