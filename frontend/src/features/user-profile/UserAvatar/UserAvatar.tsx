import { Avatar, useTheme } from "@mui/material";
import { EditUserProfileModel } from "../../../models/edit-user-profile.model";

interface Props {
  user?: EditUserProfileModel;
  size: string;
}


export default function UserAvatar({user, size}: Props): JSX.Element {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const primaryBg = theme.palette.primary[mode];
  const primaryFontColor = theme.palette.primary.contrastText;

  return user?.imgUrl
  ? <Avatar sx={{ width: 56, height: 56 }} src={user.imgUrl}></Avatar>
  : <Avatar sx={{ bgcolor: primaryBg, color: primaryFontColor, width: size, height: size }}>
    {(user?.firstName?.charAt(0) ?? '?') + (user?.lastName?.charAt(0) ?? '?')}
  </Avatar>
}