const apiUrl =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_PRODUCTION_URL
    : process.env.NEXT_PUBLIC_API_DEVELOPMENT_URL;

export { apiUrl };
