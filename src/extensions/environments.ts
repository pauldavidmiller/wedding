export const isDevelopment = () => {
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "[::1]";
  return isLocalhost && process.env.NODE_ENV === "development";
};
