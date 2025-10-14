/**
 * 퀴즈 결과 제출 API
 * 
 * POST /api/stats/submit
 * 사용자가 퀴즈를 완료하면 결과를 제출하여 통계를 업데이트합니다
 */

'use server'

import { submitResult } from '@/lib/stats'
import type { IQuizResult } from '@/types'

export async function submitQuizResult(result: IQuizResult){
    try{
        if(!result.mbtiType){
            throw new Error('MBTI 유형이 필요합니다.');
        }

        const totalSubmissions = await submitResult(result);

        return {
            success: true,
            totalSubmissions
        };

    }catch(error){
        console.error('Error submitting result:', error)
        return {
            success: false,
            error: error instanceof Error ? 
            error.message : '결과 제출에 실패했습니다',
            
        }
    }
}

// export async function POST(request: Request): Promise<NextResponse> {
//     try {
//       const result: IQuizResult = await request.json()
      
//       // 필수 필드 검증
//       if (!result.mbtiType) {
//         return NextResponse.json(
//           { error: 'mbtiType is required' },
//           { status: 400 }
//         )
//       }
      
//       // 통계에 결과 제출
//       const totalSubmissions = await submitResult(result)
      
//       return NextResponse.json({
//         success: true,
//         totalSubmissions
//       })
//     } catch (error) {
//       console.error('Error submitting result:', error)
//       return NextResponse.json(
//         { error: 'Failed to submit result' },
//         { status: 500 }
//       )
//     }
//   }