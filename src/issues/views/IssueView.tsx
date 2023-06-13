import { Link, Navigate, useParams } from 'react-router-dom'
import { IssueComment } from '../components'
import LoadingIcon from '../../shared/components/LoadingIcon'
import { useIssue } from '../hooks'

export const IssueView = () => {
  const { id = '0' } = useParams()
  const { commentsQuery, issueQuery } = useIssue(Number(id))

  if (issueQuery.isLoading) return <LoadingIcon />

  return (
    <div className='row mb-5'>
      <div className='col-12 mb-3'>
        <Link to='./issues/list'>Go Back</Link>
      </div>
      {
        (issueQuery.data == null)
          ? (<Navigate to='./issues/list' />)
          : (<IssueComment issue={issueQuery.data} />)
      }

      {/* Comentarios de otros */}
      {commentsQuery.isLoading && <LoadingIcon />}
      {
        commentsQuery.data?.map(issue => (
          <IssueComment key={issue.id} issue={issue} />
        ))
      }
    </div>
  )
}
