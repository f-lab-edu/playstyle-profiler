'use client' // useState를 사용하므로 클라이언트 컴포넌트

import { useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Label,
  Progress,
} from '@/components/ui'

/**
 * Shadcn UI 컴포넌트 테스트 페이지
 * 
 * 이 페이지는 학습용입니다:
 * - 각 컴포넌트가 어떻게 보이는지 확인
 * - 사용 예시를 직접 볼 수 있음
 * - 실제 프로젝트에서는 삭제해도 됨
 */
export default function TestComponentsPage() {
  const [progress, setProgress] = useState<number>(33)
  const [inputValue, setInputValue] = useState<string>('')

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* 페이지 제목 */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Shadcn UI 컴포넌트 테스트</h1>
          <p className="text-muted-foreground">
            모든 컴포넌트가 정상적으로 작동하는지 확인해보세요
          </p>
        </div>

        {/* Button 컴포넌트 테스트 */}
        <Card>
          <CardHeader>
            <CardTitle>Button 컴포넌트</CardTitle>
            <CardDescription>
              다양한 variant와 size를 제공합니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Variant 예시 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Variants:</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Size 예시 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Sizes:</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">🚀</Button>
              </div>
            </div>

            {/* Disabled 예시 */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Disabled:</h3>
              <Button disabled>Disabled Button</Button>
            </div>
          </CardContent>
        </Card>

        {/* Input & Label 컴포넌트 테스트 */}
        <Card>
          <CardHeader>
            <CardTitle>Input & Label 컴포넌트</CardTitle>
            <CardDescription>
              폼 입력 필드와 라벨입니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="test">입력해보세요</Label>
              <Input
                id="test"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="타이핑해보세요"
              />
              <p className="text-sm text-muted-foreground">
                입력한 값: {inputValue || '(없음)'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="disabled">비활성화된 입력</Label>
              <Input
                id="disabled"
                disabled
                placeholder="입력할 수 없습니다"
              />
            </div>
          </CardContent>
        </Card>

        {/* Progress 컴포넌트 테스트 */}
        <Card>
          <CardHeader>
            <CardTitle>Progress 컴포넌트</CardTitle>
            <CardDescription>
              진행률을 표시합니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>진행률</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => setProgress(Math.max(0, progress - 10))}
              >
                -10%
              </Button>
              <Button
                size="sm"
                onClick={() => setProgress(Math.min(100, progress + 10))}
              >
                +10%
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setProgress(0)}
              >
                초기화
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">다양한 진행률:</p>
              <div className="space-y-2">
                <Progress value={0} />
                <Progress value={25} />
                <Progress value={50} />
                <Progress value={75} />
                <Progress value={100} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 컴포넌트 조합 예시 */}
        <Card>
          <CardHeader>
            <CardTitle>Card 컴포넌트 조합</CardTitle>
            <CardDescription>
              Header, Content, Footer를 자유롭게 조합할 수 있습니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              이 카드처럼 Header, Content, Footer를 필요에 따라 조합하세요.
            </p>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline">취소</Button>
            <Button>확인</Button>
          </CardFooter>
        </Card>

        {/* 다크모드 안내 */}
        <Card>
          <CardHeader>
            <CardTitle>🌙 다크 모드 지원</CardTitle>
            <CardDescription>
              모든 컴포넌트는 다크 모드를 지원합니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              다크모드를 테스트하려면 부모 요소에{' '}
              <code className="rounded bg-muted px-1.5 py-0.5">
                className="dark"
              </code>{' '}
              를 추가하세요.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

