import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['lh3.googleusercontent.com'],
    domains: ['utfs.io'],
    remotePatterns: [
    {
      hostname: "avatar.vercel.sh",
      port: ""
    }
    ]
  }
};

export default nextConfig;
