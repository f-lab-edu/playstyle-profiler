import { IPlaystyleProfile, MBTIType } from '../types'

export const PLAYSTYLE_PROFILES: Record<MBTIType, IPlaystyleProfile> = {
  // 분석가 그룹 (NT)
  INTJ: {
    mbtiType: 'INTJ',
    title: '마스터 전략가',
    description: '장기적 계획과 완벽한 전략으로 게임을 지배하는 타입입니다. 시스템을 완전히 이해하고 최적화된 빌드를 만들어냅니다.',
    strengths: [
      '전략적 사고와 장기 계획',
      '시스템 최적화 능력',
      '독립적인 플레이 스타일',
      '메타 분석과 이론 정립'
    ],
    weaknesses: [
      '즉흥적 상황 대처 어려움',
      '팀워크보다 개인 플레이 선호',
      '단순 반복 작업 지루함',
      '감정적 판단 회피'
    ],
    recommendedGames: [
      'Civilization VI',
      'Chess.com',
      'Europa Universalis IV',
      'XCOM 2',
      'Factorio'
    ],
    recommendedWeapons: [
      '저격총 (정확성과 계획성)',
      '마법사 스태프 (전략적 원거리)',
      '궁술 (신중한 조준)',
      '전술 장비 (계획적 접근)'
    ],
    recommendedStrategies: [
      '맵 컨트롤과 정보 수집',
      '장기적 자원 관리',
      '적의 약점 분석 후 집중 공격',
      '완벽한 타이밍 기다리기'
    ],
    compatibleTypes: ['ENTP', 'ENFP', 'INTP', 'INFP'],
    tips: [
      '너무 완벽을 추구하지 말고 실행에 옮기세요',
      '팀원들과 소통하며 전략을 공유하세요',
      '새로운 메타와 변화에 적응하세요',
      '가끔은 즉흥적인 플레이도 시도해보세요'
    ]
  },

  INTP: {
    mbtiType: 'INTP',
    title: '이론가 게이머',
    description: '게임의 원리와 메커니즘을 깊이 탐구하며, 창의적이고 혁신적인 플레이 방식을 개발하는 타입입니다.',
    strengths: [
      '게임 시스템 깊이 있는 이해',
      '창의적이고 혁신적인 접근',
      '논리적 문제 해결 능력',
      '독창적인 전략 개발'
    ],
    weaknesses: [
      '실행력 부족',
      '루틴한 반복 작업 회피',
      '팀 협업 소극적',
      '감정적 갈등 회피'
    ],
    recommendedGames: [
      'Kerbal Space Program',
      'Dwarf Fortress',
      'The Witness',
      'Portal 2',
      'Cities: Skylines'
    ],
    recommendedWeapons: [
      '실험적 무기 (새로운 조합)',
      '엔지니어링 도구',
      '변형 가능한 무기',
      '분석 장비'
    ],
    recommendedStrategies: [
      '새로운 조합과 실험',
      '시스템 취약점 발견',
      '창의적 문제 해결',
      '이론적 접근 후 검증'
    ],
    compatibleTypes: ['ENTJ', 'ENFJ', 'INTJ', 'INFJ'],
    tips: [
      '아이디어를 실제로 구현해보세요',
      '다른 플레이어들과 이론을 토론하세요',
      '완벽하지 않아도 일단 시도해보세요',
      '팀플레이에서도 자신의 강점을 활용하세요'
    ]
  },

  ENTJ: {
    mbtiType: 'ENTJ',
    title: '지배자 리더',
    description: '팀을 이끌며 승리를 위해 모든 것을 조직하고 지휘하는 타고난 리더십을 가진 타입입니다.',
    strengths: [
      '뛰어난 리더십과 지휘력',
      '전략적 사고와 실행력',
      '목표 지향적 플레이',
      '팀 조직화 능력'
    ],
    weaknesses: [
      '독재적 성향',
      '세부 사항 놓치기 쉬움',
      '인내심 부족',
      '감정적 측면 소홀'
    ],
    recommendedGames: [
      'League of Legends',
      'Starcraft II',
      'Age of Empires',
      'Total War 시리즈',
      'Overwatch'
    ],
    recommendedWeapons: [
      '지휘관 무기 (팀 버프)',
      '대형 무기 (강력한 데미지)',
      '전술 장비',
      '리더십 아이템'
    ],
    recommendedStrategies: [
      '팀 전체 전략 수립',
      '역할 분담과 지시',
      '적극적인 공격 주도',
      '승리 조건 집중'
    ],
    compatibleTypes: ['INTP', 'INFP', 'ENTP', 'ENFP'],
    tips: [
      '팀원들의 의견도 들어보세요',
      '세부적인 실행도 신경 쓰세요',
      '감정적 소통도 중요합니다',
      '실패를 통해 배우는 자세를 가지세요'
    ]
  },

  ENTP: {
    mbtiType: 'ENTP',
    title: '혁신가 게이머',
    description: '새로운 가능성을 탐구하고 창의적인 플레이로 상대를 놀라게 하는 혁신적인 타입입니다.',
    strengths: [
      '창의적이고 혁신적인 플레이',
      '빠른 적응력',
      '다양한 전략 시도',
      '팀 분위기 메이킹'
    ],
    weaknesses: [
      '집중력 지속 어려움',
      '루틴한 연습 회피',
      '세부 계획 부족',
      '감정적 판단 경향'
    ],
    recommendedGames: [
      'Among Us',
      'Fall Guys',
      'Rocket League',
      '샌드박스 게임들',
      '실험적 인디게임'
    ],
    recommendedWeapons: [
      '다양한 무기 조합',
      '변칙적 무기',
      '임시 조합 무기',
      '서프라이즈 아이템'
    ],
    recommendedStrategies: [
      '예측 불가능한 플레이',
      '다양한 전략 실험',
      '창의적 콤보 개발',
      '상황별 즉흥 대응'
    ],
    compatibleTypes: ['INTJ', 'INFJ', 'ENTJ', 'ENFJ'],
    tips: [
      '한 가지에 집중하는 연습을 하세요',
      '기본기도 탄탄히 다지세요',
      '계획성 있는 접근도 시도하세요',
      '팀원들과의 소통을 늘리세요'
    ]
  },

  // 외교관 그룹 (NF)
  INFJ: {
    mbtiType: 'INFJ',
    title: '전략적 수호자',
    description: '팀의 조화를 중시하면서도 깊이 있는 전략으로 게임을 이끌어가는 신중한 타입입니다.',
    strengths: [
      '팀 조화와 협력 중시',
      '장기적 전략 수립',
      '상대방 패턴 분석',
      '감정적 지지 제공'
    ],
    weaknesses: [
      '갈등 상황 회피',
      '과도한 완벽주의',
      '혼자만의 시간 필요',
      '비판에 민감함'
    ],
    recommendedGames: [
      'Journey',
      'Animal Crossing',
      'Stardew Valley',
      'Fire Emblem',
      '협동 퍼즐 게임'
    ],
    recommendedWeapons: [
      '지원형 무기',
      '방어구 중심',
      '힐링 아이템',
      '팀 버프 장비'
    ],
    recommendedStrategies: [
      '팀원 보호와 지원',
      '안정적인 후방 지원',
      '상황 분석 후 조언',
      '팀 사기 관리'
    ],
    compatibleTypes: ['ENTP', 'ENFP', 'INTP', 'INFP'],
    tips: [
      '자신의 의견도 적극적으로 표현하세요',
      '완벽하지 않아도 시도해보세요',
      '갈등도 성장의 기회로 보세요',
      '혼자만의 게임 시간도 가지세요'
    ]
  },

  INFP: {
    mbtiType: 'INFP',
    title: '이상주의 모험가',
    description: '자신만의 가치와 스타일을 추구하며 게임 속에서 의미와 재미를 찾는 순수한 타입입니다.',
    strengths: [
      '독창적인 플레이 스타일',
      '게임 스토리 몰입',
      '창의적 문제 해결',
      '개인 가치 추구'
    ],
    weaknesses: [
      '경쟁적 상황 스트레스',
      '체계적 훈련 어려움',
      '팀 갈등 시 위축',
      '비판에 상처받기 쉬움'
    ],
    recommendedGames: [
      'Minecraft',
      'The Elder Scrolls',
      'Ori and the Blind Forest',
      'Celeste',
      '스토리 중심 RPG'
    ],
    recommendedWeapons: [
      '개성 있는 무기',
      '예술적 디자인 장비',
      '의미 있는 아이템',
      '커스터마이징 가능 장비'
    ],
    recommendedStrategies: [
      '자신만의 스타일 개발',
      '스토리와 세계관 탐구',
      '개인 목표 추구',
      '창의적 접근 방식'
    ],
    compatibleTypes: ['ENTJ', 'ENFJ', 'INTJ', 'INFJ'],
    tips: [
      '경쟁보다는 자신과의 성장에 집중하세요',
      '같은 관심사를 가진 사람들과 플레이하세요',
      '실패를 두려워하지 마세요',
      '자신의 페이스를 유지하세요'
    ]
  },

  ENFJ: {
    mbtiType: 'ENFJ',
    title: '카리스마 지도자',
    description: '팀원들을 이끌고 격려하며 모두가 즐길 수 있는 게임 환경을 만드는 천생 멘토 타입입니다.',
    strengths: [
      '뛰어난 팀 리더십',
      '팀원 동기부여 능력',
      '소통과 협력 중시',
      '분위기 메이킹'
    ],
    weaknesses: [
      '자신보다 팀 우선',
      '갈등 해결 부담',
      '과도한 책임감',
      '비판적 피드백 어려움'
    ],
    recommendedGames: [
      'World of Warcraft',
      'Destiny 2',
      'Left 4 Dead 2',
      'Guild Wars 2',
      '협동 게임들'
    ],
    recommendedWeapons: [
      '팀 지원 무기',
      '리더십 장비',
      '보호막 생성 장비',
      '팀 버프 아이템'
    ],
    recommendedStrategies: [
      '팀원 역량 극대화',
      '긍정적 팀 분위기 조성',
      '개인별 맞춤 지도',
      '협력적 전술 개발'
    ],
    compatibleTypes: ['INTP', 'INFP', 'ENTP', 'ENFP'],
    tips: [
      '자신의 성장도 챙기세요',
      '때로는 강한 결정도 필요합니다',
      '개인 시간도 확보하세요',
      '완벽한 리더가 되려 하지 마세요'
    ]
  },

  ENFP: {
    mbtiType: 'ENFP',
    title: '열정적 탐험가',
    description: '무한한 에너지와 창의성으로 게임의 모든 가능성을 탐구하는 자유로운 영혼의 타입입니다.',
    strengths: [
      '무한한 열정과 에너지',
      '창의적 플레이 스타일',
      '팀 분위기 활성화',
      '새로운 시도 두려움 없음'
    ],
    weaknesses: [
      '집중력 지속 어려움',
      '단조로운 연습 싫어함',
      '계획성 부족',
      '감정 기복'
    ],
    recommendedGames: [
      'No Man\'s Sky',
      'Terraria',
      'Party Games',
      '소셜 VR 게임',
      '오픈 월드 게임'
    ],
    recommendedWeapons: [
      '화려한 스킬 무기',
      '다양한 효과 장비',
      '모험용 도구',
      '서프라이즈 아이템'
    ],
    recommendedStrategies: [
      '다양한 전략 실험',
      '즉흥적 판단과 행동',
      '팀 사기 진작',
      '새로운 가능성 탐구'
    ],
    compatibleTypes: ['INTJ', 'INFJ', 'ENTJ', 'ENFJ'],
    tips: [
      '한 가지에 집중하는 연습을 하세요',
      '기본기 연습도 재미있게 만들어보세요',
      '장기 목표를 세워보세요',
      '감정 관리도 중요합니다'
    ]
  },

  // 관리자 그룹 (SJ)
  ISTJ: {
    mbtiType: 'ISTJ',
    title: '신뢰할 수 있는 수비수',
    description: '체계적이고 안정적인 플레이로 팀의 든든한 버팀목이 되는 책임감 있는 타입입니다.',
    strengths: [
      '체계적이고 계획적인 플레이',
      '안정적인 성과',
      '규칙과 전략 준수',
      '꾸준한 실력 향상'
    ],
    weaknesses: [
      '변화 적응 어려움',
      '즉흥적 플레이 부족',
      '새로운 시도 소극적',
      '창의성 부족'
    ],
    recommendedGames: [
      'Chess',
      'Europa Universalis',
      '전략 RPG',
      'SimCity',
      '체계적 경영게임'
    ],
    recommendedWeapons: [
      '검증된 기본 무기',
      '방어 중심 장비',
      '실용적 도구',
      '안정성 높은 무기'
    ],
    recommendedStrategies: [
      '검증된 전략 반복',
      '안정적 자원 관리',
      '체계적 스킬 개발',
      '방어 중심 플레이'
    ],
    compatibleTypes: ['ESFP', 'ESTP', 'ENFP', 'ENTP'],
    tips: [
      '새로운 전략도 시도해보세요',
      '즉흥적인 플레이도 연습하세요',
      '변화를 두려워하지 마세요',
      '창의적 접근도 가치 있습니다'
    ]
  },

  ISFJ: {
    mbtiType: 'ISFJ',
    title: '헌신적인 보호자',
    description: '팀원들을 세심하게 보살피며 조화로운 게임 환경을 만드는 따뜻한 마음의 타입입니다.',
    strengths: [
      '팀원 케어와 지원',
      '세심한 관찰력',
      '안정적인 플레이',
      '협력적 태도'
    ],
    weaknesses: [
      '갈등 상황 스트레스',
      '자기 주장 부족',
      '변화 적응 어려움',
      '과도한 타인 배려'
    ],
    recommendedGames: [
      'Overwatch (힐러)',
      'Final Fantasy XIV',
      '협동 퍼즐 게임',
      'Animal Crossing',
      '케어 중심 게임'
    ],
    recommendedWeapons: [
      '힐링 장비',
      '보호막 생성 도구',
      '지원형 무기',
      '팀 버프 아이템'
    ],
    recommendedStrategies: [
      '팀원 생존 우선',
      '안전한 포지션 유지',
      '상황 파악 후 지원',
      '팀 조화 추구'
    ],
    compatibleTypes: ['ESTP', 'ESFP', 'ENTP', 'ENFP'],
    tips: [
      '자신의 의견도 표현하세요',
      '때로는 공격적 플레이도 필요합니다',
      '개인 성장도 챙기세요',
      '갈등을 회피하지 마세요'
    ]
  },

  ESTJ: {
    mbtiType: 'ESTJ',
    title: '실행력 있는 지휘관',
    description: '효율적인 전략과 강력한 실행력으로 팀을 승리로 이끄는 타고난 지휘관 타입입니다.',
    strengths: [
      '강력한 리더십',
      '효율적 팀 운영',
      '목표 지향적 플레이',
      '실행력과 추진력'
    ],
    weaknesses: [
      '융통성 부족',
      '감정적 측면 소홀',
      '독단적 결정',
      '세부 사항 놓치기'
    ],
    recommendedGames: [
      'Starcraft II',
      'Command & Conquer',
      'Rainbow Six Siege',
      'Age of Empires',
      '전술 FPS'
    ],
    recommendedWeapons: [
      '지휘관 장비',
      '고화력 무기',
      '전술 도구',
      '팀 조직화 아이템'
    ],
    recommendedStrategies: [
      '명확한 역할 분담',
      '효율적 자원 활용',
      '목표 집중 공격',
      '체계적 전술 실행'
    ],
    compatibleTypes: ['ISFP', 'INFP', 'ISTP', 'INTP'],
    tips: [
      '팀원들의 의견도 수용하세요',
      '감정적 소통도 중요합니다',
      '유연한 전략도 필요합니다',
      '개인적 관계도 챙기세요'
    ]
  },

  ESFJ: {
    mbtiType: 'ESFJ',
    title: '화합의 조성자',
    description: '팀의 화합과 분위기를 책임지며 모든 팀원이 최고의 성과를 낼 수 있도록 돕는 타입입니다.',
    strengths: [
      '뛰어난 팀워크',
      '분위기 조성 능력',
      '팀원 동기부여',
      '소통과 협력'
    ],
    weaknesses: [
      '갈등 상황 스트레스',
      '개인 성과보다 팀 우선',
      '변화 적응 어려움',
      '비판에 민감함'
    ],
    recommendedGames: [
      'Among Us',
      'Fall Guys',
      '파티 게임',
      '협동 어드벤처',
      '소셜 게임'
    ],
    recommendedWeapons: [
      '팀 지원 무기',
      '분위기 전환 아이템',
      '협력 강화 도구',
      '커뮤니케이션 장비'
    ],
    recommendedStrategies: [
      '팀 사기 관리',
      '협력적 전술',
      '갈등 중재',
      '포용적 리더십'
    ],
    compatibleTypes: ['ISTP', 'ISFP', 'INTP', 'INFP'],
    tips: [
      '자신의 성과도 어필하세요',
      '때로는 강한 결정도 필요합니다',
      '개인 시간도 확보하세요',
      '변화에 적응하는 연습을 하세요'
    ]
  },

  // 탐험가 그룹 (SP)
  ISTP: {
    mbtiType: 'ISTP',
    title: '냉정한 문제 해결사',
    description: '순간의 판단력과 뛰어난 적응력으로 어떤 상황도 돌파하는 실용적인 타입입니다.',
    strengths: [
      '뛰어난 순간 판단력',
      '높은 적응력',
      '실용적 문제 해결',
      '침착한 대응'
    ],
    weaknesses: [
      '장기 계획 부족',
      '팀 소통 소극적',
      '감정 표현 어려움',
      '루틴 작업 지루함'
    ],
    recommendedGames: [
      'Counter-Strike',
      'Dark Souls',
      'Sekiro',
      '액션 RPG',
      '실시간 전략게임'
    ],
    recommendedWeapons: [
      '정밀 무기',
      '다목적 도구',
      '기술적 장비',
      '상황별 특화 무기'
    ],
    recommendedStrategies: [
      '상황 분석 후 즉시 대응',
      '개인 기량 중심 플레이',
      '효율적 자원 활용',
      '적응적 전술 변경'
    ],
    compatibleTypes: ['ESFJ', 'ENFJ', 'ESTJ', 'ENTJ'],
    tips: [
      '장기적 목표도 설정해보세요',
      '팀원들과 소통을 늘리세요',
      '감정 표현도 중요합니다',
      '계획적 접근도 시도해보세요'
    ]
  },

  ISFP: {
    mbtiType: 'ISFP',
    title: '자유로운 예술가',
    description: '자신만의 독특한 스타일과 감성으로 게임을 예술로 승화시키는 창의적인 타입입니다.',
    strengths: [
      '독창적인 플레이 스타일',
      '감성적 몰입',
      '유연한 적응력',
      '개인적 가치 추구'
    ],
    weaknesses: [
      '경쟁적 환경 스트레스',
      '체계적 연습 어려움',
      '갈등 상황 회피',
      '팀 리더십 부담'
    ],
    recommendedGames: [
      'Journey',
      'ABZÛ',
      'Gris',
      '예술적 인디게임',
      '감성적 어드벤처'
    ],
    recommendedWeapons: [
      '아름다운 디자인 무기',
      '예술적 장비',
      '개성 표현 아이템',
      '감성적 도구'
    ],
    recommendedStrategies: [
      '자신만의 스타일 개발',
      '감성적 접근',
      '창의적 문제 해결',
      '개인 페이스 유지'
    ],
    compatibleTypes: ['ESTJ', 'ESFJ', 'ENTJ', 'ENFJ'],
    tips: [
      '자신감을 가지세요',
      '팀플레이에도 참여해보세요',
      '체계적 연습 방법을 찾아보세요',
      '갈등을 성장의 기회로 보세요'
    ]
  },

  ESTP: {
    mbtiType: 'ESTP',
    title: '액션 히어로',
    description: '빠른 반응속도와 대담한 플레이로 게임을 흥미진진하게 만드는 타고난 엔터테이너 타입입니다.',
    strengths: [
      '빠른 반응속도',
      '뛰어난 상황 대처',
      '대담한 플레이',
      '팀 분위기 활성화'
    ],
    weaknesses: [
      '장기 계획 부족',
      '충동적 판단',
      '세부 분석 부족',
      '인내심 부족'
    ],
    recommendedGames: [
      'Apex Legends',
      'Fortnite',
      'Street Fighter',
      '레이싱 게임',
      '실시간 액션게임'
    ],
    recommendedWeapons: [
      '고속 연사 무기',
      '근접 전투 무기',
      '기동성 중심 장비',
      '순간 폭발력 아이템'
    ],
    recommendedStrategies: [
      '적극적인 교전',
      '빠른 포지션 이동',
      '기습과 압박',
      '순간 판단 중심'
    ],
    compatibleTypes: ['ISFJ', 'INFJ', 'ISTJ', 'INTJ'],
    tips: [
      '때로는 신중한 계획도 필요합니다',
      '장기적 목표를 세워보세요',
      '기본기 연습도 꾸준히 하세요',
      '팀원들과의 조화도 고려하세요'
    ]
  },

  ESFP: {
    mbtiType: 'ESFP',
    title: '즐거움의 전도사',
    description: '게임의 재미와 즐거움을 최우선으로 하며 모든 사람이 함께 웃을 수 있는 분위기를 만드는 타입입니다.',
    strengths: [
      '게임의 순수한 재미 추구',
      '뛰어난 사교성',
      '긍정적 에너지',
      '분위기 메이킹'
    ],
    weaknesses: [
      '경쟁적 환경 부담',
      '체계적 연습 어려움',
      '장기 집중력 부족',
      '비판에 민감함'
    ],
    recommendedGames: [
      'Mario Kart',
      'Just Dance',
      'Fall Guys',
      '파티 게임',
      '캐주얼 모바일게임'
    ],
    recommendedWeapons: [
      '재미있는 무기',
      '화려한 스킬 장비',
      '엔터테이닝 아이템',
      '소셜 기능 도구'
    ],
    recommendedStrategies: [
      '재미 중심 플레이',
      '팀 분위기 조성',
      '창의적 접근',
      '즐거운 경험 공유'
    ],
    compatibleTypes: ['ISTJ', 'ISFJ', 'INTJ', 'INFJ'],
    tips: [
      '때로는 진지한 연습도 필요합니다',
      '개인 실력 향상도 중요합니다',
      '피드백을 성장의 기회로 보세요',
      '목표 설정을 통해 동기를 유지하세요'
    ]
  }
}
