import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/**
 * class-variance-authority (cva)를 사용한 버튼 스타일 정의
 * 
 * 왜 cva를 사용하나요?
 * - 여러 variant(변형)를 타입 안전하게 관리
 * - 조건에 따라 다른 스타일 조합을 쉽게 적용
 * - 코드 재사용성이 높아짐
 */
const buttonVariants = cva(
  // 기본 스타일 - 모든 버튼에 공통으로 적용
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      // variant: 버튼의 목적/스타일
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      // size: 버튼의 크기
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    // 기본값 설정
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * asChild: true일 때 Button의 자식을 버튼처럼 렌더링
   * 예: <Button asChild><Link href="/">홈</Link></Button>
   * Link가 button 스타일을 받지만 실제로는 <a> 태그로 렌더링됨
   */
  asChild?: boolean
}

/**
 * Button 컴포넌트
 * 
 * forwardRef를 사용하는 이유:
 * - 부모 컴포넌트에서 button의 ref에 접근 가능
 * - DOM 조작이나 focus() 같은 메서드 호출 가능
 */
const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // asChild가 true면 Slot 컴포넌트를 사용 (자식 요소에 props 전달)
    // false면 일반 button 태그 사용
    const Comp = asChild ? Slot : 'button'
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

// React DevTools에서 보이는 컴포넌트 이름
Button.displayName = 'Button'

export { Button, buttonVariants }

