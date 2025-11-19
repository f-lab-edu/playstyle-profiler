import { IAnswer, IQuestion, IQuizResult, MBTIDimension, MBTIType } from '../types'

export function calculateMBTIScores(
  answers: IAnswer[],
  questions: IQuestion[]
): Record<MBTIDimension, number> {
  const scores: Record<MBTIDimension, number> = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  }

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question) return

    const option = question.options.find(opt => opt.id === answer.optionId)
    if (!option) return

    option.scores.forEach(score => {
      scores[score.dimension] += score.value
    })
  })

  return scores
}

export function calculatePercentages(
  scores: Record<MBTIDimension, number>
): Record<MBTIDimension, number> {
  const maxScore = Math.max(
    Math.abs(scores.E - scores.I),
    Math.abs(scores.S - scores.N),
    Math.abs(scores.T - scores.F),
    Math.abs(scores.J - scores.P)
  )

  if (maxScore === 0) {
    return { E: 50, I: 50, S: 50, N: 50, T: 50, F: 50, J: 50, P: 50 }
  }

  const totalEI = Math.abs(scores.E) + Math.abs(scores.I)
  const totalSN = Math.abs(scores.S) + Math.abs(scores.N)
  const totalTF = Math.abs(scores.T) + Math.abs(scores.F)
  const totalJP = Math.abs(scores.J) + Math.abs(scores.P)

  return {
    E: totalEI > 0 ? Math.round((Math.abs(scores.E) / totalEI) * 100) : 50,
    I: totalEI > 0 ? Math.round((Math.abs(scores.I) / totalEI) * 100) : 50,
    S: totalSN > 0 ? Math.round((Math.abs(scores.S) / totalSN) * 100) : 50,
    N: totalSN > 0 ? Math.round((Math.abs(scores.N) / totalSN) * 100) : 50,
    T: totalTF > 0 ? Math.round((Math.abs(scores.T) / totalTF) * 100) : 50,
    F: totalTF > 0 ? Math.round((Math.abs(scores.F) / totalTF) * 100) : 50,
    J: totalJP > 0 ? Math.round((Math.abs(scores.J) / totalJP) * 100) : 50,
    P: totalJP > 0 ? Math.round((Math.abs(scores.P) / totalJP) * 100) : 50
  }
}

export function determineMBTIType(scores: Record<MBTIDimension, number>): MBTIType {
  const ei = scores.E > scores.I ? 'E' : 'I'
  const sn = scores.S > scores.N ? 'S' : 'N'
  const tf = scores.T > scores.F ? 'T' : 'F'
  const jp = scores.J > scores.P ? 'J' : 'P'

  return (ei + sn + tf + jp) as MBTIType
}

export function findDominantTraits(
  scores: Record<MBTIDimension, number>
): MBTIDimension[] {
  const pairs = [
    { higher: scores.E > scores.I ? 'E' : 'I', diff: Math.abs(scores.E - scores.I) },
    { higher: scores.S > scores.N ? 'S' : 'N', diff: Math.abs(scores.S - scores.N) },
    { higher: scores.T > scores.F ? 'T' : 'F', diff: Math.abs(scores.T - scores.F) },
    { higher: scores.J > scores.P ? 'J' : 'P', diff: Math.abs(scores.J - scores.P) }
  ]

  return pairs
    .sort((a, b) => b.diff - a.diff)
    .map(pair => pair.higher as MBTIDimension)
}

export function calculateQuizResult(
  answers: IAnswer[],
  questions: IQuestion[],
  startTime: Date,
  endTime: Date
): IQuizResult {
  const scores = calculateMBTIScores(answers, questions)
  const percentages = calculatePercentages(scores)
  const mbtiType = determineMBTIType(scores)
  const dominantTraits = findDominantTraits(scores)
  const completionTime = Math.round((endTime.getTime() - startTime.getTime()) / 1000)

  return {
    mbtiType,
    scores,
    percentages,
    dominantTraits,
    completionTime,
    totalQuestions: questions.length
  }
}

export function isValidMBTIType(type: string): type is MBTIType {
  const validTypes: MBTIType[] = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP'
  ]
  return validTypes.includes(type as MBTIType)
}

export function calculateCompatibility(type1: MBTIType, type2: MBTIType): number {
  if (type1 === type2) return 100

  const chars1 = type1.split('') as MBTIDimension[]
  const chars2 = type2.split('') as MBTIDimension[]

  let compatibility = 0
  
  for (let i = 0; i < 4; i++) {
    if (chars1[i] === chars2[i]) {
      compatibility += 25
    } else {
      if ((chars1[i] === 'E' && chars2[i] === 'I') || 
          (chars1[i] === 'I' && chars2[i] === 'E')) {
        compatibility += 15
      }
      if ((chars1[i] === 'S' && chars2[i] === 'N') || 
          (chars1[i] === 'N' && chars2[i] === 'S')) {
        compatibility += 10
      }
      if ((chars1[i] === 'T' && chars2[i] === 'F') || 
          (chars1[i] === 'F' && chars2[i] === 'T')) {
        compatibility += 15
      }
      if ((chars1[i] === 'J' && chars2[i] === 'P') || 
          (chars1[i] === 'P' && chars2[i] === 'J')) {
        compatibility += 10
      }
    }
  }

  return Math.min(compatibility, 100)
}
