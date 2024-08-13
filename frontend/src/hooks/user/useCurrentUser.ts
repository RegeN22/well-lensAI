import { useEffect, useState } from "react";
import { EditUserProfileModel } from "../../models/edit-user-profile.model";
import { editProfile } from "../../services/user-service";

export function useCurrentUser(): [EditUserProfileModel | undefined, (profile: EditUserProfileModel) => void] {
  const [profile, setProfile] = useState<EditUserProfileModel | undefined>(undefined);
  useEffect(() => {
    try {
      const existingUserData = JSON.parse(localStorage.getItem('currentUser') ?? '')._doc;  // TODO find out why the object is so weird
      setProfile(existingUserData);
    } catch (e) {
      console.error(e);
    }
  }, [])

  const updateProfile = (newProfileData: EditUserProfileModel) => {
    editProfile(newProfileData).then(data => console.log(data));
  }

  return [profile, updateProfile];
}