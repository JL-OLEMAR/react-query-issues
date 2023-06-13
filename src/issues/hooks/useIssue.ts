/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query'
import { githubApi } from '../../api/githubApi'
import { sleep } from '../../helpers/sleep'
import { Issue } from '../interfaces'

const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  await sleep(2)
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`)
  return data
}

const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
  await sleep(2)
  const { data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`)
  return data
}

export function useIssue(issueNumber: number) {
  const issueQuery = useQuery(
    ['issue_by', issueNumber], // Name at devtools
    () => getIssueInfo(issueNumber)
  )

  const commentsQuery = useQuery(
    ['issue_by', issueNumber, 'comments'], // Name at devtools
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
