/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cs14.pikabu.ru","localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
// http://localhost:3000/(https://lh3.googleusercontent.com/a/ACg8ocKe1EFhmPPJbB73Uice6MGQu5Cl06D5g1861qVTahJr=s96-c)
