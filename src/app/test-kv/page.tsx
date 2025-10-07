/**
 * Vercel KV 연결 테스트 페이지
 * 
 * /test-kv 경로로 접속하여 KV 연결을 테스트할 수 있습니다
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function TestKVPage() {
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTest = async (action: string, mbtiType?: string) => {
    setIsLoading(true)
    try {
      if (action === 'get') {
        const response = await fetch('/api/test-kv')
        const data = await response.json()
        setResult(data)
      } else {
        const response = await fetch('/api/test-kv', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, mbtiType })
        })
        const data = await response.json()
        setResult(data)
        
        // 저장 후 자동으로 조회
        if (data.success) {
          setTimeout(async () => {
            const getResponse = await fetch('/api/test-kv')
            const getData = await getResponse.json()
            setResult(getData)
          }, 500)
        }
      }
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Vercel KV 연결 테스트</h1>
        <p className="text-muted-foreground">
          버튼을 눌러서 Redis 연결 상태를 확인하세요
        </p>
      </div>

      <div className="grid gap-6 mb-6">
        {/* 연결 테스트 */}
        <Card>
          <CardHeader>
            <CardTitle>1. 연결 확인</CardTitle>
            <CardDescription>
              Vercel KV가 제대로 연결되었는지 확인합니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              onClick={() => handleTest('get')}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? '확인 중...' : '🔍 연결 상태 확인'}
            </Button>
          </CardContent>
        </Card>

        {/* 데이터 저장 테스트 */}
        <Card>
          <CardHeader>
            <CardTitle>2. 데이터 저장</CardTitle>
            <CardDescription>
              테스트 데이터를 Redis에 저장합니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              onClick={() => handleTest('set')}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              {isLoading ? '저장 중...' : '💾 테스트 데이터 저장'}
            </Button>
          </CardContent>
        </Card>

        {/* MBTI 카운트 증가 테스트 */}
        <Card>
          <CardHeader>
            <CardTitle>3. MBTI 통계 테스트</CardTitle>
            <CardDescription>
              실제 통계 기능처럼 MBTI 카운트를 증가시킵니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP'].map(type => (
                <Button
                  key={type}
                  onClick={() => handleTest('increment', type)}
                  disabled={isLoading}
                  variant="secondary"
                  size="sm"
                >
                  {type} +1
                </Button>
              ))}
              {['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'].map(type => (
                <Button
                  key={type}
                  onClick={() => handleTest('increment', type)}
                  disabled={isLoading}
                  variant="secondary"
                  size="sm"
                >
                  {type} +1
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 초기화 */}
        <Card>
          <CardHeader>
            <CardTitle>4. 테스트 데이터 삭제</CardTitle>
            <CardDescription>
              테스트용 데이터만 삭제합니다 (MBTI 통계는 유지)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => handleTest('reset')}
              disabled={isLoading}
              variant="destructive"
              className="w-full"
            >
              {isLoading ? '삭제 중...' : '🗑️ 테스트 데이터 삭제'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 결과 표시 */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              결과
              {result.success ? (
                <Badge variant="default">성공</Badge>
              ) : (
                <Badge variant="destructive">실패</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
            
            {result.connected && result.testData && (
              <div className="mt-4 space-y-2">
                <h3 className="font-semibold">📊 통계 요약</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">테스트 카운터:</span>
                    <strong className="ml-2">{result.testData.counter || 0}</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground">총 제출:</span>
                    <strong className="ml-2">{result.testData.totalSubmissions || 0}</strong>
                  </div>
                </div>
                
                {result.testData.mbtiCounts && Object.keys(result.testData.mbtiCounts).length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">MBTI 카운트</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {Object.entries(result.testData.mbtiCounts).map(([type, count]) => (
                        <div key={type} className="bg-muted p-2 rounded text-center">
                          <div className="font-semibold">{type}</div>
                          <div className="text-sm text-muted-foreground">{String(count)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
