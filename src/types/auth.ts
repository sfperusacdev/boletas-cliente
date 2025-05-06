export interface UserSession {
  token: string;
  login_at: number;
  user_info: {
    username: string;
    first_name?: string;
    last_name_paterno?: string;
    last_name_materno?: string;
    email?: string;
    phone?: string;
    gender?: string;
    avatarUrl?: string;
    is_active?: boolean;
  };
}
