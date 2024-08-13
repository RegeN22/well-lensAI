import {  BottomNavigation, BottomNavigationAction, Box, CssBaseline, Paper, styled } from "@mui/material";
import {useState} from "react"
import HistoryIcon from '@mui/icons-material/History';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import PersonIcon from '@mui/icons-material/Person';
import "./Footer.css"

const TabBarButton = styled(BottomNavigationAction)({
  '&.Mui-selected': {
    color: '#404d44',
  },
});

export default function Footer() {
    const [value, setValue] = useState(0);
  
    return (
      <Box>
        <CssBaseline />
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <TabBarButton label="MY ACCOUNT" className="bottom-icon" icon={<PersonIcon />} />
            <TabBarButton label="SCAN" className="bottom-icon" icon={<LocalSeeIcon />} />
            <TabBarButton label="HISTORY" className="bottom-icon" icon={<HistoryIcon />} />
          </BottomNavigation>
        </Paper>
      </Box>
    );
  }
  