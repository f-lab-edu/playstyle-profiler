#!/usr/bin/env node

/**
 * Playstyle Profiler - Notion Portfolio Update Script
 *
 * 이 스크립트는 Notion에 프로젝트 포트폴리오를 생성/업데이트합니다.
 * 기존의 여러 중복 스크립트를 통합한 버전입니다.
 *
 * 사용법:
 *   node scripts/update-portfolio.js
 *
 * 환경 변수 설정 (.env.local):
 *   NOTION_TOKEN - Notion API 토큰
 *   NOTION_PAGE_ID - 업데이트할 페이지 ID
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
const { NotionClient } = require('./notion-utils');
const { NotionBlocks } = require('./notion-blocks');

// 환경 변수 검증
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID;

if (!NOTION_TOKEN || !NOTION_PAGE_ID) {
  console.error('❌ 오류: NOTION_TOKEN 및 NOTION_PAGE_ID 환경 변수가 필요합니다.');
  console.error('💡 .env.local 파일을 확인하세요.');
  process.exit(1);
}

// Notion 클라이언트 초기화
const client = new NotionClient(NOTION_TOKEN);

/**
 * 포트폴리오 블록 생성
 */
function createPortfolioBlocks() {
  return [
    // 제목
    NotionBlocks.heading1('🎮 Playstyle Profiler 포트폴리오!!', 'blue'),
    NotionBlocks.divider(),

    // 프로젝트 개요
    NotionBlocks.callout(
      '🎯',
      '게이머의 플레이 스타일을 분석하고 MBTI처럼 유형화하는 웹 애플리케이션',
      'blue_background'
    ),

    NotionBlocks.heading2('📌 프로젝트 정보'),
    NotionBlocks.bulletedListItem('기술 스택: Next.js 15, TypeScript, Tailwind CSS, Vercel KV (Redis)'),
    NotionBlocks.bulletedListItem('기간: 2025년'),
    NotionBlocks.bulletedListItem('역할: 풀스택 개발'),
    NotionBlocks.paragraphWithLink('🔗 GitHub: ', 'playstyle-profiler', 'https://github.com/your-username/playstyle-profiler'),
    NotionBlocks.paragraphWithLink('🌐 Demo: ', 'Live Site', 'https://playstyle-profiler.vercel.app'),

    NotionBlocks.divider(),

    // 주요 기능
    NotionBlocks.heading2('✨ 주요 기능'),

    NotionBlocks.heading3('1. 퀴즈 시스템'),
    NotionBlocks.bulletedListItem('20개의 게임 시나리오 기반 질문'),
    NotionBlocks.bulletedListItem('4가지 선택지로 플레이 스타일 측정'),
    NotionBlocks.bulletedListItem('부드러운 애니메이션과 진행률 표시'),

    NotionBlocks.heading3('2. 결과 분석'),
    NotionBlocks.bulletedListItem('6가지 플레이 스타일 차원 분석 (공격성, 탐험성, 전략성 등)'),
    NotionBlocks.bulletedListItem('레이더 차트 시각화'),
    NotionBlocks.bulletedListItem('개인화된 스타일 설명 및 추천 게임'),

    NotionBlocks.heading3('3. 대시보드 & 통계'),
    NotionBlocks.bulletedListItem('실시간 통계 조회'),
    NotionBlocks.bulletedListItem('스타일별 분포 차트'),
    NotionBlocks.bulletedListItem('Redis 기반 고속 데이터 처리'),

    NotionBlocks.divider(),

    // 기술 구현
    NotionBlocks.heading2('🛠️ 기술적 구현'),

    NotionBlocks.heading3('Next.js 15 Server Actions'),
    NotionBlocks.callout(
      '💡',
      'Route Handler에서 Server Actions으로 마이그레이션하여 코드 간소화 및 성능 개선',
      'gray_background'
    ),

    NotionBlocks.styledParagraph([
      { text: 'Before: ', bold: true },
      { text: 'Route Handler 방식으로 API 엔드포인트 구현' }
    ]),

    NotionBlocks.code('typescript', `// Route Handler (이전)
export async function POST(request: Request) {
  const result = await request.json()
  await submitResult(result)
  return NextResponse.json({ success: true })
}`),

    NotionBlocks.styledParagraph([
      { text: 'After: ', bold: true },
      { text: 'Server Actions으로 간소화' }
    ]),

    NotionBlocks.code('typescript', `// Server Action (개선)
'use server'
export async function submitQuizResult(result: IQuizResult) {
  await submitResult(result)
  return { success: true }
}`),

    NotionBlocks.bulletedListItem('✅ 보일러플레이트 코드 50% 감소'),
    NotionBlocks.bulletedListItem('✅ 타입 안정성 향상'),
    NotionBlocks.bulletedListItem('✅ 자동 캐싱 및 재검증'),

    NotionBlocks.divider(),

    NotionBlocks.heading3('Vercel KV (Redis) 데이터 관리'),
    NotionBlocks.code('typescript', `// stats.ts - Redis 데이터 저장
import { kv } from '@vercel/kv'

export async function submitResult(result: IQuizResult) {
  const key = \`quiz:\${result.sessionId}\`
  await kv.set(key, result)

  // 통계 업데이트
  await kv.hincrby('stats:total', 'submissions', 1)
  await kv.hincrby(\`stats:style:\${result.dominantStyle}\`, 'count', 1)
}`),

    NotionBlocks.bulletedListItem('고속 인메모리 데이터베이스'),
    NotionBlocks.bulletedListItem('세션별 결과 저장 및 통계 집계'),
    NotionBlocks.bulletedListItem('Vercel과 통합되어 배포 간편'),

    NotionBlocks.divider(),

    NotionBlocks.heading3('Zod를 활용한 Validation 강화'),
    NotionBlocks.code('typescript', `// validation.ts
import { z } from 'zod'

export const QuizResultSchema = z.object({
  sessionId: z.string().uuid(),
  answers: z.array(z.number().min(0).max(3)),
  dominantStyle: z.enum(['explorer', 'achiever', 'socializer', 'killer']),
  scores: z.record(z.number().min(0).max(100))
})

// Server Action에서 사용
export async function submitQuizResult(data: unknown) {
  const result = QuizResultSchema.parse(data) // 자동 검증
  await submitResult(result)
}`),

    NotionBlocks.bulletedListItem('런타임 타입 체크로 데이터 무결성 보장'),
    NotionBlocks.bulletedListItem('명시적인 에러 메시지'),
    NotionBlocks.bulletedListItem('TypeScript와 완벽한 호환'),

    NotionBlocks.divider(),

    // SEO 최적화
    NotionBlocks.heading2('🔍 SEO 최적화'),
    NotionBlocks.bulletedListItem('Next.js 15 Metadata API 활용'),
    NotionBlocks.bulletedListItem('Open Graph 및 Twitter Card 설정'),
    NotionBlocks.bulletedListItem('동적 메타데이터 생성 (결과 페이지)'),

    NotionBlocks.code('typescript', `// app/layout.tsx
export const metadata: Metadata = {
  title: 'Playstyle Profiler - 나의 게임 성향 찾기',
  description: '20개의 질문으로 알아보는 나의 플레이 스타일',
  openGraph: {
    title: 'Playstyle Profiler',
    description: '게이머 성향 분석 서비스',
    images: ['/og-image.png']
  }
}`),

    NotionBlocks.divider(),

    // 성과 및 배운 점
    NotionBlocks.heading2('📈 성과 및 배운 점'),

    NotionBlocks.callout(
      '🎯',
      '주요 성과',
      'green_background'
    ),
    NotionBlocks.bulletedListItem('Next.js 15의 최신 기능 (Server Actions, Metadata API) 실전 적용'),
    NotionBlocks.bulletedListItem('Route Handler → Server Actions 마이그레이션으로 코드 품질 개선'),
    NotionBlocks.bulletedListItem('Zod를 통한 타입 안전성 강화'),
    NotionBlocks.bulletedListItem('Redis를 활용한 실시간 통계 처리'),

    NotionBlocks.callout(
      '💡',
      '기술적 학습',
      'yellow_background'
    ),
    NotionBlocks.bulletedListItem('Server Actions의 장단점 및 적절한 사용 시나리오 이해'),
    NotionBlocks.bulletedListItem('Redis 데이터 모델링 및 성능 최적화'),
    NotionBlocks.bulletedListItem('런타임 validation의 중요성'),
    NotionBlocks.bulletedListItem('SEO 친화적인 React 애플리케이션 설계'),

    NotionBlocks.divider(),

    // 향후 개선 계획
    NotionBlocks.heading2('🚀 향후 개선 계획'),
    NotionBlocks.bulletedListItem('[ ] 카카오톡 공유 기능 추가'),
    NotionBlocks.bulletedListItem('[ ] 사용자 계정 시스템 (결과 히스토리)'),
    NotionBlocks.bulletedListItem('[ ] AI 기반 게임 추천 시스템'),
    NotionBlocks.bulletedListItem('[ ] 다국어 지원 (i18n)'),

    NotionBlocks.divider(),

    // 푸터
    NotionBlocks.paragraph([
      NotionBlocks.richText('📅 최종 업데이트: ', { bold: true }),
      NotionBlocks.richText(new Date().toLocaleDateString('ko-KR'))
    ]),

    NotionBlocks.callout(
      '🤖',
      '이 문서는 통합된 Notion 스크립트로 자동 생성되었습니다.',
      'gray_background'
    )
  ];
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log('🚀 Notion 포트폴리오 업데이트 시작...\n');

  try {
    // 페이지 확인
    console.log('📄 페이지 확인 중...');
    const page = await client.getPage(NOTION_PAGE_ID);
    console.log(`✅ 페이지 발견: "${page.properties?.title?.title?.[0]?.plain_text || 'Untitled'}"\n`);

    // 블록 생성
    console.log('📝 포트폴리오 블록 생성 중...');
    const blocks = createPortfolioBlocks();
    console.log(`✅ ${blocks.length}개 블록 생성 완료\n`);

    // Notion에 업로드
    console.log('☁️  Notion에 업로드 중...');
    const result = await client.appendBlocks(NOTION_PAGE_ID, blocks);
    console.log(`✅ 업로드 완료!\n`);

    // 결과 출력
    console.log('┌─────────────────────────────────────────┐');
    console.log('│  🎉 포트폴리오 업데이트 완료!           │');
    console.log('└─────────────────────────────────────────┘');
    console.log(`\n🔗 Notion 페이지: https://notion.so/${NOTION_PAGE_ID.replace(/-/g, '')}`);
    console.log(`📊 추가된 블록: ${Array.isArray(result) ? result.reduce((sum, r) => sum + (r.results?.length || 0), 0) : result.results?.length || blocks.length}개`);

  } catch (error) {
    console.error('\n❌ 오류 발생:', error.message);

    if (error.message.includes('401')) {
      console.error('💡 NOTION_TOKEN이 올바르지 않거나 만료되었습니다.');
    } else if (error.message.includes('404')) {
      console.error('💡 페이지를 찾을 수 없습니다. NOTION_PAGE_ID를 확인하세요.');
    } else if (error.message.includes('object_not_found')) {
      console.error('💡 Integration이 해당 페이지에 접근 권한이 없습니다.');
      console.error('   Notion 페이지 설정에서 Integration을 추가하세요.');
    }

    process.exit(1);
  }
}

// 스크립트가 직접 실행될 때만 main 함수 호출
if (require.main === module) {
  main();
}

module.exports = { createPortfolioBlocks };
