import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  CssBaseline,
  Paper,
  styled,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import HistoryIcon from "@mui/icons-material/History";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import PersonIcon from "@mui/icons-material/Person";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

const TabBarButton = styled(BottomNavigationAction)({
  "&.Mui-selected": {
    color: "#404d44",
  },
});

export default function Footer() {
  const [value, setValue] = useState(0);
  const { spacing } = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: spacing(3.6) }}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={1}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <TabBarButton
            label="HISTORY"
            className="bottom-icon"
            icon={<HistoryIcon />}
            onClick={() => navigate("/home")}
          />
          <TabBarButton
            label="SCAN"
            className="bottom-icon"
            icon={<LocalSeeIcon />}
            onClick={() => navigate("/home/new")}
          />
          <TabBarButton
            label="PROFILE"
            className="bottom-icon"
            icon={<PersonIcon />}
            onClick={() => navigate("/profile")}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
