'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Share2, Link as LinkIcon, Check, MessageCircle } from 'lucide-react'
import { MBTIType } from '@/types'

interface IShareButtonsProps {
  mbtiType: MBTIType
  profileTitle: string
}

export function ShareButtons({ mbtiType, profileTitle }: IShareButtonsProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const handleCopyUrl = async () => {
    try {
      const url = window.location.origin + `/result?type=${mbtiType}`
      await navigator.clipboard.writeText(url)
      
      setIsCopied(true)
      
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } catch (error) {
      console.error('URL 복사 실패:', error)
      alert('URL 복사에 실패했습니다.')
    }
  }

  const handleKakaoShare = () => {
    if (typeof window === 'undefined') return

    try {
      if (!window.Kakao) {
        alert('카카오톡 공유 기능을 사용할 수 없습니다.')
        return
      }

      if (window.Kakao.isInitialized()) {
        window.Kakao.cleanup()
      }

      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY || '')

      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: ' 플레이스타일 MBTI 결과',
          description: `나는 ${mbtiType} - ${profileTitle}!\n당신의 플레이스타일도 알아보세요!`,
          imageUrl: window.location.origin + '/og-image.png',
          link: {
            mobileWebUrl: window.location.origin + `/result?type=${mbtiType}`,
            webUrl: window.location.origin + `/result?type=${mbtiType}`,
          },
        },
        buttons: [
          {
            title: '내 결과 보기',
            link: {
              mobileWebUrl: window.location.origin + `/result?type=${mbtiType}`,
              webUrl: window.location.origin + `/result?type=${mbtiType}`,
            },
          },
          {
            title: '나도 테스트하기',
            link: {
              mobileWebUrl: window.location.origin,
              webUrl: window.location.origin,
            },
          },
        ],
      })
    } catch (error) {
      console.error('카카오톡 공유 실패:', error)
      alert('카카오톡 공유에 실패했습니다.')
    }
  }

  return (
    <div className="space-y-4">
      {/* 공유하기 메인 버튼 */}
      <Button
        size="lg"
        variant="outline"
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="w-full gap-2"
      >
        <Share2 className="w-4 h-4" />
        결과 공유하기
      </Button>

      {/* 공유 옵션 메뉴 */}
      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="border-2">
              <CardContent className="p-4 space-y-3">
                {/* URL 복사 버튼 */}
                <Button
                  variant="ghost"
                  onClick={handleCopyUrl}
                  className="w-full justify-start gap-3 h-auto py-3"
                  disabled={isCopied}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    {isCopied ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      >
                        <Check className="w-5 h-5 text-primary" />
                      </motion.div>
                    ) : (
                      <LinkIcon className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">
                      {isCopied ? '링크가 복사되었습니다!' : 'URL 복사'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {isCopied
                        ? '친구들에게 공유해보세요'
                        : '링크를 복사하여 공유하기'}
                    </div>
                  </div>
                </Button>

                {/* 카카오톡 공유 버튼 */}
                <Button
                  variant="ghost"
                  onClick={handleKakaoShare}
                  className="w-full justify-start gap-3 h-auto py-3"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400">
                    <MessageCircle className="w-5 h-5 text-yellow-900" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">카카오톡 공유</div>
                    <div className="text-xs text-muted-foreground">
                      카카오톡으로 결과 공유하기
                    </div>
                  </div>
                </Button>

                {/* 트위터 공유 버튼 (선택사항) */}
                <Button
                  variant="ghost"
                  onClick={() => {
                    const text = `나는 ${mbtiType} - ${profileTitle}! 🎮\n당신의 플레이스타일도 알아보세요!`
                    const url = window.location.origin + `/result?type=${mbtiType}`
                    window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
                      '_blank'
                    )
                  }}
                  className="w-full justify-start gap-3 h-auto py-3"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
              
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
