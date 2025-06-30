import type { NextConfig } from "next";

// module.exports = {
//   async redirects() {
//     return [
//       {
//         source: "/users/home",
//         destination: "/",
//         permanent: true, // 301 Redirect
//       },
//     ];
//   },
// };

const nextConfig: NextConfig = {
  reactStrictMode: false,
};

module.exports = nextConfig;

export default nextConfig;
