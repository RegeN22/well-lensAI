import { Avatar, Card, CardHeader, IconButton, useTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { AccountBox } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../hooks/user/useCurrentUser";

interface Props {
  isInteractive: boolean;
}

export default function UserSummaryCard({ isInteractive }: Props): JSX.Element {
  const [profile] = useCurrentUser();
  const navigate = useNavigate();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const primaryBg = theme.palette.primary[mode];
  const secondaryBg = theme.palette.secondary[mode];
  const fontColor = theme.palette.primary.contrastText;

  return <Card sx={{ bgcolor: primaryBg, color: fontColor }}>
    <CardHeader
      avatar={
        profile?.imgUrl
          ? <Avatar src={profile.imgUrl}></Avatar>
          : <Avatar sx={{ bgcolor: secondaryBg }}>
            {(profile?.firstName?.charAt(0) ?? '?') + (profile?.firstName?.charAt(0) ?? '?')}
          </Avatar>
      }
      action={isInteractive ?
        <IconButton onClick={() => navigate('/edit-profile')}>
          <AccountBox />
        </IconButton> : undefined
      }
      title={`${profile?.firstName} ${profile?.lastName} @${profile?.username}`}
      subheader={`${profile?.age ?? 'Unknown'} yo, ${profile?.gender ?? 'Gender Unknown'}, ${profile?.diseases?.length ?? 'Unknown'} Deseases, ${profile?.allergies?.length ?? 'Unknown'} Allergies`}
    />
  </Card>;
}