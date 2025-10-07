/**
 * Vercel KV 연결 테스트 API
 * 
 * GET /api/test-kv - 테스트 데이터 조회
 * POST /api/test-kv - 테스트 데이터 저장
 */

import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET(): Promise<NextResponse> {
  try {
    // 테스트 데이터 조회
    const value = await kv.get('test-key')
    const counter = await kv.get('test-counter')
    
    // 모든 MBTI 카운트 조회
    const mbtiCounts = await kv.hgetall('mbti-counts')
    const totalSubmissions = await kv.get('total-submissions')
    
    return NextResponse.json({
      success: true,
      connected: true,
      testData: {
        value,
        counter,
        mbtiCounts,
        totalSubmissions
      },
      message: '✅ Vercel KV 연결 성공!'
    })
  } catch (error) {
    console.error('KV connection error:', error)
    return NextResponse.json(
      {
        success: false,
        connected: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: '❌ Vercel KV 연결 실패'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json()
    const { action } = body
    
    if (action === 'set') {
      // 테스트 데이터 저장
      await kv.set('test-key', `Hello from KV! ${new Date().toISOString()}`)
      await kv.incr('test-counter')
      
      return NextResponse.json({
        success: true,
        message: '✅ 데이터 저장 성공!'
      })
    }
    
    if (action === 'increment') {
      // MBTI 카운트 증가 테스트
      const { mbtiType } = body
      await kv.hincrby('mbti-counts', mbtiType || 'INTJ', 1)
      await kv.incr('total-submissions')
      
      return NextResponse.json({
        success: true,
        message: `✅ ${mbtiType || 'INTJ'} 카운트 증가!`
      })
    }
    
    if (action === 'reset') {
      // 테스트 데이터 삭제
      await kv.del('test-key')
      await kv.del('test-counter')
      
      return NextResponse.json({
        success: true,
        message: '✅ 테스트 데이터 삭제 완료!'
      })
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('KV operation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'
