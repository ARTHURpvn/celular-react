/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: false,
    images: {
      domains: ['i.postimg.cc'],
      unoptimized: true
    },
    distDir: 'out',
    basePath: ''
  };
  
  export default nextConfig;
  