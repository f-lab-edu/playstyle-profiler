/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'development' ? undefined : 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    dirs: ['pages', 'components', 'lib', 'src'],
    // 빌드 시 ESLint 무시 (개발 중에는 IDE에서 체크)
    ignoreDuringBuilds: false
  },
  typescript: {
    // 빌드 시 타입 에러 무시 (개발 중에는 IDE에서 체크)
    ignoreBuildErrors: false
  }
}

module.exports = nextConfig
