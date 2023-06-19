import { githubApi } from './githubApi'
import { sleep } from '../helpers'
import { Issue, State } from '../issues/interfaces'

interface Props {
  labels: string[]
  stateIssues?: State
  page?: number
}

export const getIssues = async ({ labels = [], stateIssues, page = 1 }: Props): Promise<Issue[]> => {
  await sleep(2)

  const params = new URLSearchParams()

  if (stateIssues) params.append('state', stateIssues)

  if (labels.length > 0) {
    // 'lab1, lab2, lab3' ONE STRING, no ['lab1', 'lab2', 'lab3']
    const labelsString = labels.join(',')
    params.append('labels', labelsString)
  }

  // Display the first page
  params.append('page', page.toString())

  // that each page will have 5 items
  params.append('per_page', '5')

  const { data } = await githubApi.get<Issue[]>('/issues?', { params })
  return data
}
