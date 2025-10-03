import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Input 컴포넌트 Props 인터페이스
 * 
 * React.InputHTMLAttributes를 확장:
 * - type, placeholder, value, onChange 등 모든 input 속성 사용 가능
 * - 타입 안전성 확보
 */
export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input 컴포넌트
 * 
 * forwardRef를 사용하는 이유:
 * 1. React Hook Form 같은 라이브러리와 호환
 *    - register() 함수가 ref를 사용
 * 2. 부모 컴포넌트에서 input.focus() 같은 메서드 호출 가능
 * 3. 애니메이션 라이브러리와 통합 시 필요
 */
const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // 기본 스타일
          'flex h-10 w-full rounded-md border border-input',
          'bg-background px-3 py-2 text-base',
          // 플레이스홀더 스타일
          'placeholder:text-muted-foreground',
          // 포커스 스타일 (접근성을 위해 중요!)
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-ring focus-visible:ring-offset-2',
          // disabled 스타일
          'disabled:cursor-not-allowed disabled:opacity-50',
          // 반응형: 모바일에서는 16px (확대 방지), 데스크톱은 기본 크기
          'md:text-sm',
          // 추가 커스텀 클래스
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

/**
 * 사용 예시:
 * 
 * // 기본 사용
 * <Input type="text" placeholder="이름을 입력하세요" />
 * 
 * // Label과 함께
 * <div className="space-y-2">
 *   <Label htmlFor="email">이메일</Label>
 *   <Input id="email" type="email" placeholder="example@email.com" />
 * </div>
 * 
 * // React Hook Form과 함께
 * const { register } = useForm()
 * <Input 
 *   {...register('username', { required: true })} 
 *   placeholder="사용자명"
 * />
 * 
 * // ref 사용
 * const inputRef = useRef<HTMLInputElement>(null)
 * <Input ref={inputRef} />
 * <Button onClick={() => inputRef.current?.focus()}>포커스</Button>
 * 
 * // 커스텀 스타일
 * <Input 
 *   className="border-red-500 focus-visible:ring-red-500" 
 *   placeholder="에러 상태"
 * />
 */

export { Input }

