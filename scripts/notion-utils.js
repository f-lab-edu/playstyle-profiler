const https = require('https');

/**
 * Notion API Client
 * 모든 Notion API 호출을 처리하는 통합 클라이언트
 */
class NotionClient {
  constructor(token, version = '2022-06-28') {
    if (!token) {
      throw new Error('NOTION_TOKEN is required');
    }
    this.token = token;
    this.version = version;
  }

  /**
   * Notion API 호출
   * @param {string} path - API 경로 (예: '/v1/blocks/{id}/children')
   * @param {string} method - HTTP 메서드 (GET, POST, PATCH, DELETE)
   * @param {object} data - 요청 데이터
   * @returns {Promise<object>} API 응답
   */
  async call(path, method = 'GET', data = {}) {
    const dataString = JSON.stringify(data);

    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.notion.com',
        port: 443,
        path: path,
        method: method,
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
          'Notion-Version': this.version,
          'Content-Length': Buffer.byteLength(dataString)
        }
      };

      const req = https.request(options, (res) => {
        let body = '';

        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          try {
            const parsed = JSON.parse(body);

            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(parsed);
            } else {
              reject(new Error(
                `Notion API Error (${res.statusCode}): ${parsed.message || body}`
              ));
            }
          } catch (e) {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(body);
            } else {
              reject(new Error(`HTTP ${res.statusCode}: ${body}`));
            }
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Network Error: ${error.message}`));
      });

      req.write(dataString);
      req.end();
    });
  }

  /**
   * 페이지에 블록 추가
   * @param {string} pageId - Notion 페이지 ID
   * @param {Array} blocks - 추가할 블록 배열
   * @returns {Promise<object>} API 응답
   */
  async appendBlocks(pageId, blocks) {
    if (!Array.isArray(blocks) || blocks.length === 0) {
      throw new Error('blocks must be a non-empty array');
    }

    // Notion API는 한 번에 최대 100개 블록만 허용
    const MAX_BLOCKS = 100;

    if (blocks.length <= MAX_BLOCKS) {
      return this.call(`/v1/blocks/${pageId}/children`, 'PATCH', {
        children: blocks
      });
    }

    // 100개 이상인 경우 배치 처리
    const results = [];
    for (let i = 0; i < blocks.length; i += MAX_BLOCKS) {
      const batch = blocks.slice(i, i + MAX_BLOCKS);
      console.log(`📦 Batch ${Math.floor(i / MAX_BLOCKS) + 1}: ${batch.length} blocks`);

      const result = await this.call(`/v1/blocks/${pageId}/children`, 'PATCH', {
        children: batch
      });

      results.push(result);

      // Rate limiting을 위한 딜레이
      if (i + MAX_BLOCKS < blocks.length) {
        await this.delay(300);
      }
    }

    return results;
  }

  /**
   * 페이지 검색
   * @param {object} query - 검색 쿼리
   * @returns {Promise<object>} 검색 결과
   */
  async searchPages(query = {}) {
    return this.call('/v1/search', 'POST', query);
  }

  /**
   * 페이지 정보 가져오기
   * @param {string} pageId - Notion 페이지 ID
   * @returns {Promise<object>} 페이지 정보
   */
  async getPage(pageId) {
    return this.call(`/v1/pages/${pageId}`, 'GET');
  }

  /**
   * 블록 정보 가져오기
   * @param {string} blockId - Notion 블록 ID
   * @returns {Promise<object>} 블록 정보
   */
  async getBlock(blockId) {
    return this.call(`/v1/blocks/${blockId}`, 'GET');
  }

  /**
   * 블록의 자식 블록 가져오기
   * @param {string} blockId - Notion 블록 ID
   * @returns {Promise<object>} 자식 블록 목록
   */
  async getBlockChildren(blockId) {
    return this.call(`/v1/blocks/${blockId}/children`, 'GET');
  }

  /**
   * 딜레이 헬퍼
   * @param {number} ms - 밀리초
   * @returns {Promise<void>}
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = { NotionClient };
