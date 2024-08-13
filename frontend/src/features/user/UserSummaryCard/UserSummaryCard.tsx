import { Avatar, Card, CardHeader, IconButton, useTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { AccountBox } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface Props {
  isInteractive: boolean;
}

export default function UserSummaryCard({ isInteractive }: Props): JSX.Element {
  const navigate = useNavigate();
  const theme = useTheme();
  const primaryBg = theme.palette.primary.main;
  const fontColor = theme.palette.primary.contrastText;

  return <Card sx={{ backgroundColor: primaryBg, color: fontColor }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }}>
          R
        </Avatar>
      }
      action={isInteractive ?
        <IconButton onClick={() => navigate('/edit-user')}>
          <AccountBox />
        </IconButton> : undefined
      }
      title="John Doe"
      subheader="2 Illnesses, 5 Allergies"
    />
  </Card>;
}
