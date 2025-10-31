/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export 제거 - Server Actions 사용을 위해
  // Vercel 배포 시 static export는 필요하지 않습니다
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
