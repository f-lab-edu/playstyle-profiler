import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'

/**
 * Progress 컴포넌트
 * 
 * Radix UI의 Progress를 사용하는 이유:
 * 1. 접근성: 자동으로 ARIA 속성 추가
 *    - role="progressbar"
 *    - aria-valuenow, aria-valuemax 등
 * 2. 브라우저 호환성: 모든 브라우저에서 동일하게 동작
 * 3. 커스터마이징: 완전히 스타일 커스텀 가능
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      // 기본 스타일
      'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
      className
    )}
    {...props}
  >
    {/**
     * Indicator: 실제 진행률을 표시하는 바
     * 
     * transform을 사용하는 이유:
     * - CSS transform은 GPU 가속을 사용해 애니메이션이 부드러움
     * - translateX(-100%)에서 시작: 왼쪽 밖에서 시작
     * - value가 50이면 translateX(-50%)로 이동: 절반 채워짐
     */}
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ 
        // value가 0이면 -100% (완전히 왼쪽)
        // value가 100이면 0% (완전히 채워짐)
        transform: `translateX(-${100 - (value || 0)}%)` 
      }}
    />
  </ProgressPrimitive.Root>
))

Progress.displayName = ProgressPrimitive.Root.displayName

/**
 * 사용 예시:
 * 
 * // 기본 사용
 * <Progress value={33} />
 * 
 * // 상태와 함께 사용
 * const [progress, setProgress] = useState(0)
 * 
 * useEffect(() => {
 *   const timer = setTimeout(() => setProgress(66), 500)
 *   return () => clearTimeout(timer)
 * }, [])
 * 
 * <Progress value={progress} />
 * 
 * // 커스텀 스타일
 * <Progress value={50} className="h-2 bg-gray-100" />
 */

export { Progress }

