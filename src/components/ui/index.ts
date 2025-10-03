/**
 * UI 컴포넌트 중앙 export 파일
 * 
 * 왜 이 파일이 필요한가요?
 * - 깔끔한 import: 
 *   import { Button, Card } from '@/components/ui'
 *   대신에
 *   import { Button } from '@/components/ui/button'
 *   import { Card } from '@/components/ui/card'
 */

export { Button, buttonVariants } from './button'
export type { IButtonProps } from './button'

export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from './card'

export { Input } from './input'
export type { IInputProps } from './input'

export { Label } from './label'

export { Progress } from './progress'

