import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'utfs.io'],
    // domains: [],
    remotePatterns: [
    {
      hostname: "avatar.vercel.sh",
      port: ""
    }
    ]
  }
};

export default nextConfig;
