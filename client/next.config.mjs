import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const nextConfig = {
  images: {
    domains: ["cs14.pikabu.ru", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    SRC: process.env.SRC,
    WEBSOCKET_SRC: process.env.WEBSOCKET_SRC,
  },
};

export default nextConfig;