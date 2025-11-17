/**
 * Notion Block Builders
 * Notion 블록 생성을 위한 헬퍼 함수 모음
 */

const NotionBlocks = {
  /**
   * Heading 1 블록
   * @param {string} text - 제목 텍스트
   * @param {string} color - 텍스트 색상 (선택)
   * @returns {object} Notion 블록
   */
  heading1(text, color = null) {
    const block = {
      object: "block",
      type: "heading_1",
      heading_1: {
        rich_text: [{ type: "text", text: { content: text } }]
      }
    };
    if (color) block.heading_1.color = color;
    return block;
  },

  /**
   * Heading 2 블록
   * @param {string} text - 제목 텍스트
   * @param {string} color - 텍스트 색상 (선택)
   * @returns {object} Notion 블록
   */
  heading2(text, color = null) {
    const block = {
      object: "block",
      type: "heading_2",
      heading_2: {
        rich_text: [{ type: "text", text: { content: text } }]
      }
    };
    if (color) block.heading_2.color = color;
    return block;
  },

  /**
   * Heading 3 블록
   * @param {string} text - 제목 텍스트
   * @param {string} color - 텍스트 색상 (선택)
   * @returns {object} Notion 블록
   */
  heading3(text, color = null) {
    const block = {
      object: "block",
      type: "heading_3",
      heading_3: {
        rich_text: [{ type: "text", text: { content: text } }]
      }
    };
    if (color) block.heading_3.color = color;
    return block;
  },

  /**
   * 단락 블록
   * @param {string|Array} text - 텍스트 또는 rich_text 배열
   * @param {object} annotations - 텍스트 스타일 (bold, italic 등)
   * @returns {object} Notion 블록
   */
  paragraph(text, annotations = {}) {
    const richText = Array.isArray(text)
      ? text
      : [{ type: "text", text: { content: text }, annotations }];

    return {
      object: "block",
      type: "paragraph",
      paragraph: { rich_text: richText }
    };
  },

  /**
   * Callout 블록
   * @param {string} emoji - 아이콘 이모지
   * @param {string|Array} text - 텍스트 또는 rich_text 배열
   * @param {string} color - 배경색 (예: "gray_background", "blue_background")
   * @returns {object} Notion 블록
   */
  callout(emoji, text, color = "gray_background") {
    const richText = Array.isArray(text)
      ? text
      : [{ type: "text", text: { content: text } }];

    return {
      object: "block",
      type: "callout",
      callout: {
        icon: { emoji },
        color,
        rich_text: richText
      }
    };
  },

  /**
   * 코드 블록
   * @param {string} language - 프로그래밍 언어 (typescript, javascript, python 등)
   * @param {string} content - 코드 내용
   * @returns {object} Notion 블록
   */
  code(language, content) {
    return {
      object: "block",
      type: "code",
      code: {
        language,
        rich_text: [{ type: "text", text: { content } }]
      }
    };
  },

  /**
   * 구분선 블록
   * @returns {object} Notion 블록
   */
  divider() {
    return {
      object: "block",
      type: "divider",
      divider: {}
    };
  },

  /**
   * 불릿 리스트 아이템
   * @param {string|Array} text - 텍스트 또는 rich_text 배열
   * @param {Array} children - 중첩된 블록 (선택)
   * @returns {object} Notion 블록
   */
  bulletedListItem(text, children = null) {
    const richText = Array.isArray(text)
      ? text
      : [{ type: "text", text: { content: text } }];

    const block = {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: { rich_text: richText }
    };

    if (children) {
      block.bulleted_list_item.children = children;
    }

    return block;
  },

  /**
   * 번호 리스트 아이템
   * @param {string|Array} text - 텍스트 또는 rich_text 배열
   * @param {Array} children - 중첩된 블록 (선택)
   * @returns {object} Notion 블록
   */
  numberedListItem(text, children = null) {
    const richText = Array.isArray(text)
      ? text
      : [{ type: "text", text: { content: text } }];

    const block = {
      object: "block",
      type: "numbered_list_item",
      numbered_list_item: { rich_text: richText }
    };

    if (children) {
      block.numbered_list_item.children = children;
    }

    return block;
  },

  /**
   * Toggle 블록
   * @param {string|Array} text - 제목 텍스트
   * @param {Array} children - 접힌 내용 블록들
   * @returns {object} Notion 블록
   */
  toggle(text, children = []) {
    const richText = Array.isArray(text)
      ? text
      : [{ type: "text", text: { content: text } }];

    return {
      object: "block",
      type: "toggle",
      toggle: {
        rich_text: richText,
        children
      }
    };
  },

  /**
   * Quote 블록
   * @param {string|Array} text - 인용 텍스트
   * @returns {object} Notion 블록
   */
  quote(text) {
    const richText = Array.isArray(text)
      ? text
      : [{ type: "text", text: { content: text } }];

    return {
      object: "block",
      type: "quote",
      quote: { rich_text: richText }
    };
  },

  /**
   * Table of Contents 블록
   * @returns {object} Notion 블록
   */
  tableOfContents() {
    return {
      object: "block",
      type: "table_of_contents",
      table_of_contents: {}
    };
  },

  /**
   * Rich text 생성 헬퍼
   * @param {string} text - 텍스트
   * @param {object} options - 스타일 옵션 { bold, italic, code, color, href }
   * @returns {object} Rich text 객체
   */
  richText(text, options = {}) {
    const richTextObj = {
      type: "text",
      text: { content: text }
    };

    // 링크 추가
    if (options.href) {
      richTextObj.text.link = { url: options.href };
    }

    // 스타일 추가
    const annotations = {};
    if (options.bold) annotations.bold = true;
    if (options.italic) annotations.italic = true;
    if (options.code) annotations.code = true;
    if (options.strikethrough) annotations.strikethrough = true;
    if (options.underline) annotations.underline = true;
    if (options.color) annotations.color = options.color;

    if (Object.keys(annotations).length > 0) {
      richTextObj.annotations = annotations;
    }

    return richTextObj;
  },

  /**
   * 여러 스타일이 적용된 단락 생성
   * @param {Array} parts - {text, ...options} 객체 배열
   * @returns {object} Notion 단락 블록
   */
  styledParagraph(parts) {
    const richText = parts.map(part =>
      this.richText(part.text, part)
    );
    return this.paragraph(richText);
  },

  /**
   * 링크가 포함된 단락
   * @param {string} text - 일반 텍스트
   * @param {string} linkText - 링크 텍스트
   * @param {string} url - 링크 URL
   * @returns {object} Notion 단락 블록
   */
  paragraphWithLink(text, linkText, url) {
    return this.styledParagraph([
      { text },
      { text: linkText, href: url, bold: true }
    ]);
  }
};

module.exports = { NotionBlocks };
