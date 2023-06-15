import { githubApi } from './githubApi'
import { sleep } from '../helpers'
import { Issue } from '../issues/interfaces'

export const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  await sleep(2)
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`)
  return data
}
