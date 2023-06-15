import { githubApi } from './githubApi'
import { Issue } from '../issues/interfaces'

export const getIssues = async (): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>('/issues')
  return data
}
