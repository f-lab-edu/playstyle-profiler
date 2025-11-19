'use server'

import { submitResult } from '@/lib/stats'
import { validateQuizResult } from '@/lib/validations'
import type { IQuizResult } from '@/types'
import { ZodError } from 'zod'

export async function submitQuizResult(result: IQuizResult){
    try{
        const validationResult = validateQuizResult(result);

        if (!validationResult.success) {
            const errorMessages = validationResult.error.issues
                .map((err) =>
                    `${err.path.join('.')}: ${err.message}`)
                .join(', ');

            throw new Error(`입력 검증 실패: ${errorMessages}`);
        }

        const validatedResult = validationResult.data;
        const totalSubmissions = await submitResult(validatedResult);

        return {
            success: true,
            totalSubmissions
        };

    }catch(error){
        console.error('Error submitting result:', error)

        if (error instanceof ZodError) {
            return {
                success: false,
                error: '입력 데이터 형식이 올바르지 않습니다',
                details: error.issues
            }
        }

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