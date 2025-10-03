import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/**
 * Label 스타일 variants
 * 
 * peer-disabled: 형제 요소가 disabled일 때 스타일 적용
 * 예: <input disabled /> <label> 일 때 label도 흐릿하게
 */
const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

/**
 * Label 컴포넌트
 * 
 * Radix UI Label을 사용하는 이유:
 * 1. 접근성: input과의 연결을 자동으로 처리
 * 2. 클릭 영역: label을 클릭하면 input에 포커스
 * 3. 폼 유효성: 브라우저가 폼 요소를 올바르게 인식
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))

Label.displayName = LabelPrimitive.Root.displayName

/**
 * 사용 예시:
 * 
 * // 기본 사용 (htmlFor로 input과 연결)
 * <Label htmlFor="email">이메일</Label>
 * <Input id="email" type="email" />
 * 
 * // disabled input과 함께
 * <Input id="name" disabled className="peer" />
 * <Label htmlFor="name">이름</Label>
 * // input이 disabled면 label도 흐릿해짐 (peer-disabled)
 * 
 * // React Hook Form과 함께
 * <Label htmlFor="password">비밀번호</Label>
 * <Input 
 *   id="password" 
 *   type="password"
 *   {...register('password')}
 * />
 */

export { Label }

