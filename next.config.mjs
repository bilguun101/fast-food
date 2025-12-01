/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  images: {

    remotePatterns: [

      {

        protocol: "https",

        hostname: "res.cloudinary.com",

      },

    ],

  },
  reactCompiler: true,
};

export default nextConfig;
