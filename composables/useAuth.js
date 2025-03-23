import { useCookie } from "#app";

export const useAuth = () => {
  const accessToken = useCookie("accessToken");
  const refreshToken = useCookie("refreshToken");
  const accessTokenExpiry = useCookie("accessTokenExpiry");

  const logout = () => {
    accessToken.value = null;
    refreshToken.value = null;
    accessTokenExpiry.value = null;
    console.log("Logged out due to missing or invalid token.");
  };

  const refreshAccessToken = async () => {
    try {
      const response = await $fetch(
        "https://api.escuelajs.co/api/v1/auth/refresh-token",
        {
          method: "POST",
          body: { refreshToken: refreshToken.value },
        }
      );

      accessToken.value = response.access_token;
      const expiresIn = 180;
      accessTokenExpiry.value = Date.now() + expiresIn * 1000;
      console.log("Access token refreshed!");
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  };

  const getValidAccessToken = async () => {
    if (!accessToken.value || Date.now() > accessTokenExpiry.value) {
      console.log("Access token expired! Refreshing...");
      await refreshAccessToken();
    }
    return accessToken.value;
  };

  return { getValidAccessToken };
};
