import { AxiosError } from "axios";
import {
  HistoryProductModel,
  ProductFromHistoryModel,
  ProductScanModel,
  UserModel,
} from "../models";
import apiClient from "./api-client";

export const getAllScans = async (): Promise<HistoryProductModel[]> => {
  const { data } = await apiClient.get("/scans");

  return data.map((obj: ProductFromHistoryModel) => {
    const binaryString = window.atob(obj.image.buffer);
    const arrayBuffer = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      arrayBuffer[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: obj.image.mimetype });

    const newData: HistoryProductModel = {
      image: URL.createObjectURL(blob),
      jsonData: obj.jsonData,
    };

    return newData;
  });
};

export const getUserScans = async (
  userId: string
): Promise<ProductScanModel[]> => {
  const currentUser: string | null = localStorage.getItem("currentUser");
  const { accessToken }: UserModel = currentUser ? JSON.parse(currentUser) : {};
  const { data }: { data: ProductScanModel[] } = await apiClient.get(
    `/scans/user/${userId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return data;
};

export const getUserScan = async (
  userId: string,
  scanId: string
): Promise<ProductScanModel[]> => {
  const currentUser: string | null = localStorage.getItem("currentUser");
  const { accessToken }: UserModel = currentUser ? JSON.parse(currentUser) : {};
  const { data }: { data: ProductScanModel[] } = await apiClient.get(
    `/scans/user/${userId}/${scanId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return data;
};

export const scan = async (picture: File): Promise<ProductScanModel> => {
  const formData = new FormData();
  formData.append("file", picture);

  const currentUser: string | null = localStorage.getItem("currentUser");
  const { _id: userId, accessToken }: UserModel = currentUser
    ? JSON.parse(currentUser)
    : {};
  try {
    const { data }: { data: ProductScanModel } = await apiClient.post(
      `/scans${userId ? `/user/${userId}` : ""}`,
      formData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return data;
  } catch (err) {
    throw err as AxiosError;
  }
};

export const deleteScan = async (userId: string, scan: ProductScanModel) => {
  const currentUser: string | null = localStorage.getItem("currentUser");
  const { accessToken }: UserModel = currentUser ? JSON.parse(currentUser) : {};
  const { data } = await apiClient.delete(`/scans/user/${userId}/${scan._id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
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
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return data;
};
