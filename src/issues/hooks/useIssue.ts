/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query'
import { getIssueComments, getIssueInfo } from '../../api'

export function useIssue(issueNumber: number) {
  const issueQuery = useQuery(
    ['issueByNumber', issueNumber], // Name at devtools
    () => getIssueInfo(issueNumber)
  )

  const commentsQuery = useQuery(
    ['issueByNumber', issueNumber, 'comments'], // Name at devtools
    () => getIssueComments(issueQuery.data!.number),
    {
      enabled: Boolean(issueQuery.data)
    }
  )

  return {
    commentsQuery,
    issueQuery
  }
}
