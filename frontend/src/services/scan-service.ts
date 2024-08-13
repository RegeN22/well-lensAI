import { ProductScanModel, UserModel } from "../models";
import apiClient from "./api-client";

export const getUserScans = async (
  userId: string
): Promise<ProductScanModel[]> => {
  const currentUser: string | null = localStorage.getItem("currentUser");
  const { accessToken }: UserModel = currentUser ? JSON.parse(currentUser) : {};
  const { data }: { data: ProductScanModel[] } = await apiClient.get(
    `/scans/user/${userId}`,
    {
      headers: { Authorization: `JWT ${accessToken}` },
    }
  );

  return data;
};

export const scan = async (
  picture: File,
  userId?: string
): Promise<ProductScanModel> => {
  const formData = new FormData();
  formData.append("file", picture);

  const currentUser: string | null = localStorage.getItem("currentUser");
  const { accessToken }: UserModel = currentUser ? JSON.parse(currentUser) : {};
  try {
    const { data }: { data: ProductScanModel } = await apiClient.post(
      `/scan${userId ? `/user/${userId}` : ""}`,
      formData,
      {
        headers: { Authorization: `JWT ${accessToken}` },
      }
    );

    return data;
  } catch (err) {
    throw err;
  }
};

export const deleteScan = async (scan: ProductScanModel) => {
  const currentUser: string | null = localStorage.getItem("currentUser");
  const { accessToken }: UserModel = currentUser ? JSON.parse(currentUser) : {};
  const { data } = await apiClient.delete(`/scans/${scan._id}`, {
    headers: { Authorization: `JWT ${accessToken}` },
  });

  return data;
};

export const createComment = async (scanId: string, content: string) => {
  const currentUser: string | null = localStorage.getItem("currentUser");
  const { accessToken, imgUrl, username }: UserModel = currentUser
    ? JSON.parse(currentUser)
    : {};
  const { data } = await apiClient.post(
    `/scans/${scanId}/comments`,
    { userImgUrl: imgUrl, content, username },
    {
      headers: { Authorization: `JWT ${accessToken}` },
    }
  );

  return data;
};
