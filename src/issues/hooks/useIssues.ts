import { useQuery } from '@tanstack/react-query'
import { getIssues } from '../../api'
import { State } from '../interfaces'

interface Props {
  labels: string[]
  stateIssues?: State
}

export function useIssues({ labels, stateIssues }: Props) {
  const issuesQuery = useQuery(
    ['issues', { labels, state: stateIssues }],
    () => getIssues({ labels, stateIssues })
  )

  return { issuesQuery }
}
