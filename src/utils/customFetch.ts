import { ConnectionError } from "./errors";

export const readToken = (): string | null => {
  const session = localStorage.getItem("session");
  if (!session) return null;
  const { token } = JSON.parse(session);
  const currentDate = new Date();
  localStorage.setItem("last_token_used", currentDate.toISOString());
  return token;
};

export const customFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  try {
    const token = readToken();
    const response = await fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        ...(token && { Authorization: token }),
      },
    });
    return response;
  } catch (e) {
    if (e instanceof TypeError) {
      throw new ConnectionError();
    }
    throw e;
  }
};
