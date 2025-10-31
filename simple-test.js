const https = require('https');

const NOTION_TOKEN = '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';
const NOTION_VERSION = '2022-06-28';
const PAGE_ID = '29045a45c9bc8062993edb24a24f3590';

// 간단한 블록 추가
function appendSimpleBlock() {
  const blocks = [
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: {
              content: "✅ Claude Code 테스트 성공! - " + new Date().toLocaleString('ko-KR')
            }
          }
        ]
      }
    }
  ];

  const payload = { children: blocks };
  const data = JSON.stringify(payload);

  console.log('📤 전송할 데이터:', JSON.stringify(payload, null, 2));
  console.log('\n📍 요청 URL:', `/v1/blocks/${PAGE_ID}/children`);
  console.log('');

  const options = {
    hostname: 'api.notion.com',
    port: 443,
    path: `/v1/blocks/${PAGE_ID}/children`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${NOTION_TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_VERSION,
      'Content-Length': Buffer.byteLength(data)
    }
  };

  const req = https.request(options, (res) => {
    let body = '';

    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      console.log('📨 응답 상태:', res.statusCode);
      console.log('📨 응답 내용:', body);

      if (res.statusCode === 200) {
        console.log('\n✅ 성공! Notion 페이지를 확인해보세요.');
        console.log('🔗 https://www.notion.so/Playstyle-Profiler-29045a45c9bc8062993edb24a24f3590');
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ 요청 실패:', error.message);
  });

  req.write(data);
  req.end();
}

console.log('🚀 Notion 페이지에 간단한 테스트 추가 중...\n');
appendSimpleBlock();
