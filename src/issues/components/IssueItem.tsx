import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { FiCheckCircle, FiInfo, FiMessageSquare } from 'react-icons/fi'

// import { getIssueComments, getIssueInfo } from '../../api'
import { Issue, State } from '../interfaces'

interface Props {
  issue: Issue
}

export const IssueItem: FC<Props> = ({ issue }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // 1) Pre carga la data, y espera como argumentos la KEY la FUNCTION que retorna la data (return FUNCTION de la API).
  // WARNING: tener cuidado porque hace demasiadas perticiones HTTPs y genera mucho consumo de recursos, en este caso al hacer hover.
  // const handlePreFetchData = () => {
  //   queryClient.prefetchQuery(
  //     ['issueByNumber', issue.number],
  //     () => getIssueInfo(issue.number)
  //   )

  //   queryClient.prefetchQuery(
  //     ['issueByNumber', issue.number, 'comments'],
  //     () => getIssueComments(issue.number)
  //   )
  // }

  // 2) Pre cargar la data, y espera como argumentos la KEY y la DATA que se desea renderizar (return API).
  // INFO: No hace la pertició HTTPs hasta que se haga click en el elemento, y recien ahi, se hace la pertición HTTPs
  const handlePreSetData = () => {
    queryClient.setQueryData(
      ['issueByNumber', issue.number],
      issue,
      {
        // Mantiene la petición HTTP siempre activa durante el tiempo que se define, siempre y cuando la petición no cambie su estado
        updatedAt: new Date().getTime() + 10000
      }
    )
  }

  return (
    <div
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
      // onMouseEnter={handlePreFetchData}
      onMouseEnter={handlePreSetData}
      className='card mb-2 issue'
    >
      <div className='card-body d-flex align-items-center'>
        {
          issue.state === State.Open
            ? <FiInfo size={30} color='red' />
            : <FiCheckCircle size={30} color='green' />
        }

        <div className='d-flex flex-column flex-fill px-2'>
          <span>
            {issue.title}
          </span>
          <span className='issue-subinfo'>
            {`#${issue.number} ${issue.state} 2 days ago by `}
            <span className='fw-bold'>{issue.user.login}</span>
          </span>
        </div>

        <div className='d-flex align-items-center'>
          <img
            src={issue.user.avatar_url}
            alt={issue.user.login}
            className='avatar'
          />
          <span className='px-2'>{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  )
}
