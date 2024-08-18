import { Avatar, Card, CardHeader, darken, IconButton, useTheme } from "@mui/material";
import { AccountBox } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { EditUserProfileModel } from "../../../models/edit-user-profile.model";

interface Props {
  user: EditUserProfileModel | undefined;
  isInteractive: boolean;
}

export default function UserSummaryCard({ user, isInteractive }: Props): JSX.Element {
  const navigate = useNavigate();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const primaryBg = theme.palette.primary[mode];
  const secondaryBg = theme.palette.secondary[mode];
  const secondaryBgDarker = darken(secondaryBg, 0.1);
  const primaryFontColor = theme.palette.primary.contrastText;
  const secondaryFontColor = theme.palette.secondary.contrastText;

  const info: string[] = [
    user?.age ? `${user?.age} yo` : undefined,
    user?.gender ? (user.gender.charAt(0).toUpperCase() + user.gender.slice(1)) : undefined,
    user?.diseases?.length ? `${user?.diseases?.length} Conditions` : undefined,
    user?.allergies?.length ? `${user?.allergies?.length} Allergies` : undefined
  ].filter(val => !!val) as string[];

  return <Card sx={{ background: `linear-gradient(to right bottom, ${secondaryBgDarker}, ${secondaryBg})`, color: secondaryFontColor }}>
    <CardHeader
      avatar={
        user?.imgUrl
          ? <Avatar src={user.imgUrl}></Avatar>
          : <Avatar sx={{ bgcolor: primaryBg, color: primaryFontColor }}>
            {(user?.firstName?.charAt(0) ?? '?') + (user?.firstName?.charAt(0) ?? '?')}
          </Avatar>
      }
      action={isInteractive ?
        <IconButton onClick={() => navigate('/edit-profile')}>
          <AccountBox />
        </IconButton> : undefined
      }
      title={`${user?.firstName} ${user?.lastName} @${user?.username}`}
      subheader={info.join(', ')}
    />
  </Card>;
}