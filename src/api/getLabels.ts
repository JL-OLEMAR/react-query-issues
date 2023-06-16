import { githubApi } from './githubApi'
import { sleep } from '../helpers'
import { Label } from '../issues/interfaces'

export const getLabels = async (): Promise<Label[]> => {
  await sleep(2)

  const { data } = await githubApi.get<Label[]>('/labels?per_page=100')
  // const { data } = await githubApi.get<Label[]>('/labels', {
  //   headers: {
  //     Authorization: null
  //   }
  // })
  return data
}
