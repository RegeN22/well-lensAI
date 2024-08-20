import { Card, CardContent, Stack, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { EditUserProfileModel } from "../../../models/edit-user-profile.model";
import UserAvatar from '../UserAvatar/UserAvatar';

interface Props {
  user: EditUserProfileModel | undefined;
}

export default function UserSummaryCard({ user }: Props): JSX.Element {
  const navigate = useNavigate();

  return <Card>
    <CardContent>
      <Stack alignItems='center'>
        <UserAvatar user={user} size='56px'/>
        <Typography variant='h6' sx={{ marginTop: '0.5em' }}>{`${user?.firstName} ${user?.lastName}`}</Typography>
        <Typography variant='subtitle2' sx={{ opacity: '0.5' }}>{`@${user?.username}`}</Typography>
        <Button sx={{ marginTop: '1em' }} variant='contained' onClick={() => navigate('/edit-profile')}>
          Edit profile
        </Button>
      </Stack>
    </CardContent>
  </Card>;
}