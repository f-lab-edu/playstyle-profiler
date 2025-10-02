'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function HomePage() {
  const [isStarted, setIsStarted] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
        >
          🎮 게임 플레이스타일
          <br />
          <span className="text-indigo-600">MBTI 테스트</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-gray-600 mb-8 leading-relaxed"
        >
          당신의 게임 플레이 방식을 분석하여<br />
          MBTI 성격 유형과 연결해드립니다
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4"
        >
          <button
            onClick={() => setIsStarted(true)}
            className="btn-primary text-xl px-8 py-4 w-full sm:w-auto"
          >
            테스트 시작하기
          </button>
          
          <p className="text-sm text-gray-500">
            약 5분 소요 • 16개 질문
          </p>
        </motion.div>

        {isStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8 p-6 bg-white rounded-xl shadow-lg"
          >
            <p className="text-gray-700">
              퀴즈 컴포넌트가 여기에 표시됩니다...
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
