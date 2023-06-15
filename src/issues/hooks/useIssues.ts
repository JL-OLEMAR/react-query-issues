import { useQuery } from '@tanstack/react-query'
import { getIssues } from '../../api'

export function useIssues() {
  const issuesQuery = useQuery(['issues'], getIssues)

  return { issuesQuery }
}
