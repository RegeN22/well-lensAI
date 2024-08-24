import { CredentialResponse } from "@react-oauth/google";
import { UserModel } from "../models";
import { EditUserProfileModel } from "../models/edit-user-profile.model";
import apiClient from "./api-client";

// TODO: Create local storage service

export const loginUser = async (user: Partial<UserModel>) => {
  const { data } = await apiClient.post("/auth/login", user);

  return data;
};

export const refresh = async (token: string) => {
  const { data } = await apiClient.get("/auth/refresh", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const registerUser = (user: UserModel): Promise<UserModel> => {
  return new Promise<UserModel>((resolve, reject) => {
    apiClient
      .post("/auth/register", user)
      .then((response: { data: UserModel }) => {
        resolve(response.data);
      })
      .catch((error: unknown) => {
        reject(error);
      });
  });
};

export const logout = async () => {
  const currentUser: string | null = localStorage.getItem("currentUser");
  const { refreshToken }: UserModel = currentUser
    ? JSON.parse(currentUser)
    : {};
  const { data } = await apiClient.get("/auth/logout", {
    headers: { Authorization: `Bearer ${refreshToken}` },
  });
  localStorage.removeItem("currentUser");
  return data;
};

export const googleSignin = (credentialResponse: CredentialResponse) => {
  return new Promise<UserModel>((resolve, reject) => {
    apiClient
      .post("/auth/google", credentialResponse)
      .then((response: { data: UserModel }) => {
        resolve(response.data);
      })
      .catch((error: unknown) => {
        reject(error);
      });
  });
};

export const getUsers = async (search?: string) => {
  const currentUser: string | null = localStorage.getItem("currentUser");
  const { accessToken }: UserModel = currentUser ? JSON.parse(currentUser) : {};
  const { data } = await apiClient.get(
    `/users${search ? `?search=${search}` : ""}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return data;
};

export const getCurrentUser = async (accessToken: string) => {
  const { data } = await apiClient.get("/users/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};

export const editProfile = async (
  editUser: EditUserProfileModel
): Promise<UserModel> => {
  const currentUser: string | null = localStorage.getItem("currentUser");
  const { accessToken }: UserModel = currentUser ? JSON.parse(currentUser) : {};

  return new Promise((resolve, reject) => {
    apiClient
      .put(
        `/users/update`,
        { ...editUser },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response: { data: UserModel }) => {
        resolve(response.data);
      })
      .catch((error: unknown) => {
        reject(error);
      });
  });
};

export const getUserById = async (userId: string) => {
  const currentUser: string | null = localStorage.getItem("currentUser");
  const { accessToken }: UserModel = currentUser ? JSON.parse(currentUser) : {};
  const { data } = await apiClient.get(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};

export const uploadAvatar = async (avatar: File): Promise<string> => {
  const currentUser: string | null = localStorage.getItem("currentUser");
  const { accessToken }: UserModel = currentUser ? JSON.parse(currentUser) : {};

  const formData = new FormData();
  formData.append("file", avatar);

  const { data } = await apiClient.post(`/users/file`, formData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
};
