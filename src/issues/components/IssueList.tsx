import { FC } from 'react'
import { IssueItem } from './IssueItem'
import { Issue, State } from '../interfaces'

interface Props {
  issues: Issue[]
  stateIssues?: State
  onStateChanged: (stateIssues?: State) => void
}

export const IssueList: FC<Props> = ({ issues, stateIssues, onStateChanged }) => {
  return (
    <div className='card border-white'>
      <div className='card-header bg-dark'>
        <ul className='nav nav-pills card-header-pills'>
          <li className='nav-item'>
            <a
              onClick={() => onStateChanged()}
              className={`nav-link ${!stateIssues ? 'active' : ''}`}
            >
              All
            </a>
          </li>
          <li className='nav-item'>
            <a
              onClick={() => onStateChanged(State.Open)}
              className={`nav-link ${stateIssues === State.Open ? 'active' : ''}`}
            >
              Open
            </a>
          </li>
          <li className='nav-item'>
            <a
              onClick={() => onStateChanged(State.Closed)}
              className={`nav-link ${stateIssues === State.Closed ? 'active' : ''}`}
            >
              Closed
            </a>
          </li>
        </ul>
      </div>
      <div className='card-body text-dark'>
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  )
}
