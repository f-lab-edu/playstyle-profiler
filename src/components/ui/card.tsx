import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Card 메인 컨테이너
 * 
 * 왜 forwardRef를 사용하나요?
 * - 부모 컴포넌트에서 Card의 DOM 요소에 직접 접근 가능
 * - 스크롤, 애니메이션 등을 위해 ref가 필요할 수 있음
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // 기본 스타일: 흰 배경, 둥근 모서리, 그림자, 테두리
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className // 추가 커스텀 클래스 병합
    )}
    {...props}
  />
))
Card.displayName = 'Card'

/**
 * CardHeader: 카드 상단 영역
 * 보통 제목과 설명이 들어감
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

/**
 * CardTitle: 카드 제목
 * 시맨틱 HTML을 위해 h3 태그 사용
 */
const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

/**
 * CardDescription: 카드 부제목/설명
 * 본문보다 흐린 색상 사용
 */
const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

/**
 * CardContent: 카드 본문
 * 주요 콘텐츠가 들어가는 영역
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn('p-6 pt-0', className)} 
    {...props} 
  />
))
CardContent.displayName = 'CardContent'

/**
 * CardFooter: 카드 하단
 * 보통 버튼이나 액션이 들어감
 * 
 * flex items-center: 자식 요소들을 가로로 정렬하고 세로 중앙 정렬
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

/**
 * 사용 예시:
 * 
 * <Card>
 *   <CardHeader>
 *     <CardTitle>카드 제목</CardTitle>
 *     <CardDescription>카드 설명</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>카드 본문 내용</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>액션</Button>
 *   </CardFooter>
 * </Card>
 */

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

