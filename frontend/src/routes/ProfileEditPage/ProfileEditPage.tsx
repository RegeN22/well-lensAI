import { Button, Chip, FormControl, FormControlLabel, FormLabel, InputAdornment, Paper, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { useCurrentUser } from "../../hooks/user/useCurrentUser";
import UserSummaryCard from "../../features/user-profile/UserSummaryCard/UserSummaryCard";
import { useEffect, useState } from "react";
import { EditUserProfileModel } from "../../models/edit-user-profile.model";
import PictureUpload from '../../features/product-scan/PictureUpload/PictureUpload';
import { uploadAvatar } from '../../services/user-service';

export default function ProfileEditPage(): JSX.Element {
  const [profile, updateProfile] = useCurrentUser();
  const [unsavedProfile, setUnsavedProfile] = useState<EditUserProfileModel>({} as EditUserProfileModel);

  useEffect(() => {
    setUnsavedProfile(profile as EditUserProfileModel);
  }, [profile]);

  const addDisease = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val: string = (e.target as HTMLInputElement).value;
      if (val?.length && !unsavedProfile.diseases?.includes(val)) {
        setUnsavedProfile({ ...unsavedProfile, diseases: [...unsavedProfile.diseases ?? [], (e.target as HTMLInputElement).value] });
      }
      (e.target as HTMLInputElement).value = '';
    }
  };
  const deleteDisease = (name: string) => setUnsavedProfile({ ...unsavedProfile, diseases: unsavedProfile.diseases?.filter(d => d !== name) });

  const addAllergy = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val: string = (e.target as HTMLInputElement).value;
      if (val?.length && !unsavedProfile.allergies?.includes(val)) {
        setUnsavedProfile({ ...unsavedProfile, allergies: [...unsavedProfile.allergies ?? [], (e.target as HTMLInputElement).value] });
      }
      (e.target as HTMLInputElement).value = '';
    }
  };
  const deleteAllergy = (name: string) => setUnsavedProfile({ ...unsavedProfile, allergies: unsavedProfile.allergies?.filter(a => a !== name) });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfile(unsavedProfile);
  };

  const changeAvatar = (file: File) => {
    uploadAvatar(file).then(path => setUnsavedProfile({ ...unsavedProfile, imgUrl: path }));
  }

  return (unsavedProfile ?
    <Stack sx={{ margin: '0.5em' }} direction="column" spacing={2}>
      <UserSummaryCard isInteractive={false} />
      <PictureUpload btnText='Change Avatar' onUpload={changeAvatar} />

      <Paper elevation={1} sx={{padding: '1em'}}>
        <form onSubmit={submitForm}>
          <Stack direction="column" spacing={3}>
            <FormControl>
              <TextField label="Add Disease" onKeyDown={addDisease} />
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ margin: '0.5em' }}>
                {unsavedProfile.diseases?.length
                  ? unsavedProfile.diseases?.map(disease => (<Chip key={disease} label={disease} onDelete={() => deleteDisease(disease)} />))
                  : <Typography variant='subtitle2'>No Diseases</Typography>}
              </Stack>
            </FormControl>
            <FormControl>
              <TextField label="Add Allergy" onKeyDown={addAllergy} />
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ margin: '0.5em' }}>
                {unsavedProfile.allergies?.length
                  ? unsavedProfile.allergies?.map(allergy => (<Chip key={allergy} label={allergy} onDelete={() => deleteAllergy(allergy)} />))
                  : <Typography variant='subtitle2'>No Allergies</Typography>}
              </Stack>
            </FormControl>

            <TextField required label="First Name" value={unsavedProfile.firstName} onInput={(e) => setUnsavedProfile({ ...unsavedProfile, firstName: (e.target as HTMLInputElement).value })} />
            <TextField required label="Last Name" value={unsavedProfile.lastName} onInput={(e) => setUnsavedProfile({ ...unsavedProfile, lastName: (e.target as HTMLInputElement).value })} />
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup row value={unsavedProfile.gender ?? 'other'} onChange={(e) => setUnsavedProfile({ ...unsavedProfile, gender: (e.target as HTMLInputElement).value })}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            <Stack direction="row" spacing={1}>
              <TextField required type='number' label="Age" value={unsavedProfile.age} onInput={(e) => setUnsavedProfile({ ...unsavedProfile, age: Number((e.target as HTMLInputElement).value) })} />
              <TextField required type='number' label="Height" value={unsavedProfile.height}
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
                onInput={(e) => setUnsavedProfile({ ...unsavedProfile, height: Number((e.target as HTMLInputElement).value) })} />
              <TextField required type='number' label="Weight" value={unsavedProfile.weight}
                InputProps={{
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                }}
                onInput={(e) => setUnsavedProfile({ ...unsavedProfile, weight: Number((e.target as HTMLInputElement).value) })} />
            </Stack>
            <Button variant='contained' type='submit'>Submit</Button>
          </Stack>
        </form>
      </Paper>
    </Stack>
    : <></>)
}