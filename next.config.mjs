/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "en",
  },
  async redirects (){
    return[
      {
        source:'/',
        destination:'/developer',
        permanent:true
      }
    ]
  }
};

export default nextConfig;
