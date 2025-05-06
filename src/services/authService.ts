import { UserSession } from "../types/auth";
import { post } from "../lib/http";
import { API_IDENTITY_URL } from "../config/api";

type RequestCreateUserDto = {
  dni: string;
  first_name: string;
  last_name_paterno: string;
  last_name_materno: string;
  email: string;
  phone: string;
  gender: string;
  new_password: string;
  confirm_password: string;
};
type LoginCredentials = {
  username: string;
  password: string;
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<UserSession> => {
    return await post<UserSession>({
      baseUrl: API_IDENTITY_URL,
      path: "/v1/global/login",
      body: credentials,
    });
  },

  register: async (data: RequestCreateUserDto) => {
    return await post({
      baseUrl: API_IDENTITY_URL,
      path: "/v1/global/users",
      body: {
        username: data.dni,
        first_name: data.first_name,
        last_name_paterno: data.last_name_paterno,
        last_name_materno: data.last_name_materno,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        password: data.new_password,
        origin_request: window.location.origin,
      },
    });
  },

  recoverAccount: async (dni: string): Promise<{ email: string }> => {
    return await post<{ email: string }, { dni: string; origin_request: string }>({
      baseUrl: API_IDENTITY_URL,
      path: "/v1/global/users/post/recovery/email",
      body: { dni, origin_request: window.location.origin },
    });
  },
};
