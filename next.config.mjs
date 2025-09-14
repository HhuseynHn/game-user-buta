/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "eu-images.contentstack.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pic.rutubelist.ru",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.playground.ru",
        pathname: "/**",
      },
       {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn2.unrealengine.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "yandex.ru",
      },
    ],
  },
};

export default nextConfig;
