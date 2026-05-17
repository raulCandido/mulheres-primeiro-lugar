/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "@nextui-org/react",
      "@nextui-org/system",
      "@nextui-org/react-utils",
      "@nextui-org/framer-utils",
    ],
  },
};

export default nextConfig;
