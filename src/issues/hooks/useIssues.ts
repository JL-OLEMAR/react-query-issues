import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getIssues } from '../../api'
import { State } from '../interfaces'

interface Props {
  labels: string[]
  stateIssues?: State
}

export function useIssues({ labels, stateIssues }: Props) {
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [labels, stateIssues])

  const issuesQuery = useQuery(
    ['issues', { labels, state: stateIssues, page }],
    () => getIssues({ labels, stateIssues, page })
  )

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return
    setPage(page + 1)
  }

  const prevPage = () => {
    if (page > 1) setPage(page - 1)
  }

  return {
    issuesQuery,
    page: issuesQuery.isFetching ? 'Loading' : page,
    nextPage,
    prevPage
  }
}
