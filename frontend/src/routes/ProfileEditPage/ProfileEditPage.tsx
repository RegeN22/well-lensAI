import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PictureUpload from "../../features/product-scan/PictureUpload/PictureUpload";
import { useCurrentUser } from "../../hooks/user/useCurrentUser";
import { EditUserProfileModel } from "../../models/edit-user-profile.model";
import { uploadAvatar } from "../../services/user-service";
import Avatar from '@mui/material/Avatar';
import UserAvatar from "../../features/user-profile/UserAvatar/UserAvatar";

export default function ProfileEditPage(): JSX.Element {
  const navigate = useNavigate();
  const [profile, updateProfile] = useCurrentUser();
  const [unsavedProfile, setUnsavedProfile] = useState<EditUserProfileModel>(
    {} as EditUserProfileModel
  );

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    setUnsavedProfile(profile as EditUserProfileModel);
  }, [profile]);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfile(unsavedProfile);
  };

  const changeAvatar = (file: File) => {
    uploadAvatar(file).then((path) =>
      setUnsavedProfile({ ...unsavedProfile, imgUrl: path })
    );
  };

  return unsavedProfile ? (
    <Stack alignItems={{xs: 'stretch', sm: 'center'}} sx={{padding: '1em'}}>
      <Stack sx={{ minWidth: {xs: 'inherit', sm: '30em'} }} spacing={2}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4">Edit Profile</Typography>
        </Box>
        <Paper elevation={1}>
          <Stack sx={{ padding: "1em" }} direction="column" spacing={3}>
            <Stack direction="column" justifyContent="center" alignItems="center">
              <UserAvatar user={unsavedProfile} size="72px"/>
              <PictureUpload
                btnText="Change Avatar"
                onUpload={changeAvatar}
                initValue={profile?.imgUrl}
              />
            </Stack>
            <Divider />
            <form onSubmit={submitForm}>
              <Stack direction="column" spacing={3}>
                <TextField
                  required
                  label="First Name"
                  value={unsavedProfile.firstName}
                  onInput={(e) =>
                    setUnsavedProfile({
                      ...unsavedProfile,
                      firstName: (e.target as HTMLInputElement).value,
                    })
                  }
                />
                <TextField
                  required
                  label="Last Name"
                  value={unsavedProfile.lastName}
                  onInput={(e) =>
                    setUnsavedProfile({
                      ...unsavedProfile,
                      lastName: (e.target as HTMLInputElement).value,
                    })
                  }
                />
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    row
                    value={unsavedProfile.gender ?? "other"}
                    onChange={(e) =>
                      setUnsavedProfile({
                        ...unsavedProfile,
                        gender: (e.target as HTMLInputElement).value,
                      })
                    }
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
                <Stack direction="row" spacing={1}>
                  <TextField
                    required
                    type="number"
                    label="Age"
                    value={unsavedProfile.age}
                    onInput={(e) =>
                      setUnsavedProfile({
                        ...unsavedProfile,
                        age: Number((e.target as HTMLInputElement).value),
                      })
                    }
                  />
                  <TextField
                    required
                    type="number"
                    label="Height"
                    value={unsavedProfile.height}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">cm</InputAdornment>
                      ),
                    }}
                    onInput={(e) =>
                      setUnsavedProfile({
                        ...unsavedProfile,
                        height: Number((e.target as HTMLInputElement).value),
                      })
                    }
                  />
                  <TextField
                    required
                    type="number"
                    label="Weight"
                    value={unsavedProfile.weight}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">kg</InputAdornment>
                      ),
                    }}
                    onInput={(e) =>
                      setUnsavedProfile({
                        ...unsavedProfile,
                        weight: Number((e.target as HTMLInputElement).value),
                      })
                    }
                  />
                </Stack>
                <MuiChipsInput
                  value={unsavedProfile.diseases ?? []}
                  hideClearAll
                  disableEdition
                  disableDeleteOnBackspace
                  label="Medical Conditions"
                  onChange={(diseases: string[]) =>
                    setUnsavedProfile({ ...unsavedProfile, diseases })
                  }
                />
                <MuiChipsInput
                  value={unsavedProfile.allergies ?? []}
                  hideClearAll
                  disableEdition
                  disableDeleteOnBackspace
                  label="Allergies"
                  onChange={(allergies: string[]) =>
                    setUnsavedProfile({ ...unsavedProfile, allergies })
                  }
                />
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  ) : (
    <></>
  );
}
