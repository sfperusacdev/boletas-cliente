import { API_IDENTITY_URL } from "../config/api";
import { get, put } from "../lib/http";
import { UserSession } from "../types/auth";

type RequestUpdateDto = {
  first_name: string;
  last_name_paterno: string;
  last_name_materno: string;
  email: string;
  phone: string;
  gender: string;
  current_password: string | null;
  new_password: string | null;
  confirm_password: string | null;
};

export const profileService = {
  updateProfile: async (data: RequestUpdateDto): Promise<void> => {
    console.log(data);
    return await put({
      baseUrl: API_IDENTITY_URL,
      path: "/v1/global/users/session",
      body: data,
    });
  },
  getProfile: async (): Promise<UserSession["user_info"]> => {
    return get<UserSession["user_info"]>({
      baseUrl: API_IDENTITY_URL,
      path: "/v1/global/users/session",
    });
  },
};
