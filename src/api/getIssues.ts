import { githubApi } from './githubApi'
import { sleep } from '../helpers'
import { Issue, State } from '../issues/interfaces'

interface Props {
  labels: string[]
  stateIssues?: State
}

export const getIssues = async ({ labels = [], stateIssues }: Props): Promise<Issue[]> => {
  await sleep(2)

  const params = new URLSearchParams()

  if (stateIssues) params.append('state', stateIssues)

  const { data } = await githubApi.get<Issue[]>('/issues?', { params })
  return data
}
