import axios from "axios";
export const API_BASE = import.meta.env.VITE_API_BASE;

const ACCESS_TOKEN_KEY = "admin_access_token";
const REFRESH_TOKEN_KEY = "admin_refresh_token";

function storage() {
  return typeof window === "undefined" ? null : window.localStorage;
}

function parseJwtPayload(token) {
  try {
    const payload = token.split(".")[1];
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(normalized));
  } catch {
    return null;
  }
}

export function getAdminAccessToken() {
  return storage()?.getItem(ACCESS_TOKEN_KEY) ?? "";
}

export function getAdminRefreshToken() {
  return storage()?.getItem(REFRESH_TOKEN_KEY) ?? "";
}

export function clearAdminTokens() {
  storage()?.removeItem(ACCESS_TOKEN_KEY);
  storage()?.removeItem(REFRESH_TOKEN_KEY);
}

export function setAdminTokens({ access, refresh, refresh_token }) {
  const nextRefresh = refresh_token ?? refresh;

  if (access) storage()?.setItem(ACCESS_TOKEN_KEY, access);
  if (nextRefresh) storage()?.setItem(REFRESH_TOKEN_KEY, nextRefresh);
}

export function isTokenExpired(token) {
  if (!token) return true;

  const payload = parseJwtPayload(token);
  if (!payload?.exp) return false;

  return Date.now() >= payload.exp * 1000 - 30000;
}

export function hasAdminSession() {
  return Boolean(getAdminAccessToken() || getAdminRefreshToken());
}

export function hasValidAdminAccessToken() {
  const access = getAdminAccessToken();
  return Boolean(access && !isTokenExpired(access));
}

export async function loginAdmin(username, password) {
  const response = await axios.post(`${API_BASE}/token/`, {
    username,
    password,
  });

  const access = response.data?.access;
  const refresh = response.data?.refresh_token ?? response.data?.refresh;

  if (!access || !refresh) {
    throw new Error("The login response did not include admin tokens.");
  }

  setAdminTokens({ access, refresh });
  return response.data;
}

export async function refreshAdminAccessToken() {
  const refresh = getAdminRefreshToken();

  if (!refresh || isTokenExpired(refresh)) {
    clearAdminTokens();
    return "";
  }

  const response = await axios.post(`${API_BASE}/token/refresh/`, {
    refresh,
  });

  const access = response.data?.access;

  if (!access) {
    clearAdminTokens();
    return "";
  }

  setAdminTokens({ access, refresh });
  return access;
}

export async function ensureAdminAccessToken() {
  if (hasValidAdminAccessToken()) {
    return getAdminAccessToken();
  }

  if (getAdminRefreshToken()) {
    return refreshAdminAccessToken();
  }

  clearAdminTokens();
  return "";
}

const adminApi = axios.create({
  baseURL: API_BASE,
});

adminApi.interceptors.request.use(async (config) => {
  const token = await ensureAdminAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

adminApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = await refreshAdminAccessToken();

        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return adminApi(originalRequest);
        }
      } catch {
        clearAdminTokens();
      }
    }

    if (
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/admin") &&
      window.location.pathname !== "/admin/login"
    ) {
      clearAdminTokens();
      window.location.assign("/admin/login");
    }

    return Promise.reject(error);
  }
);

export default adminApi;
