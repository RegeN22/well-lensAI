import { Stack } from "@mui/material";
import UserSummaryCard from "../../features/user/UserSummaryCard/UserSummaryCard";

export default function EditUserPage(): JSX.Element {
  return <Stack direction='column'>
    <UserSummaryCard isInteractive={false} />
    
  </Stack>;
}