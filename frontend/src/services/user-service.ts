import { CredentialResponse } from "@react-oauth/google";
import { EditUserModel, UserModel } from "../models";
import apiClient from "./api-client";

// TODO: Create local storage service

export const loginUser = async (user: Partial<UserModel>) => {
  const { data } = await apiClient.post("/auth/login", user);

  return data;
};

export const refresh = async (token: string) => {
  const { data } = await apiClient.get("/auth/refresh", {
    headers: { Authorization: `JWT ${token}` },
  });

  return data;
};

export const registerUser = (user: UserModel) => {
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
    headers: { Authorization: `JWT ${refreshToken}` },
  });

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
      headers: { Authorization: `JWT ${accessToken}` },
    }
  );

  return data;
};

export const getCurrentUser = async (accessToken: string) => {
  const { data } = await apiClient.get("/users/me", {
    headers: { Authorization: `JWT ${accessToken}` },
  });

  return data;
};

export const editProfile = async (userId: string, editUser: EditUserModel) => {
  const currentUser: string | null = localStorage.getItem("currentUser");
  const { accessToken }: UserModel = currentUser ? JSON.parse(currentUser) : {};

  return new Promise((resolve, reject) => {
    apiClient
      .put(
        `/users/${userId}`,
        { ...editUser },
        {
          headers: { Authorization: `JWT ${accessToken}` },
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
    headers: { Authorization: `JWT ${accessToken}` },
  });

  return data;
};
