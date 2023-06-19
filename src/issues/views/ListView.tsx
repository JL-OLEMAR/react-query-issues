import { useState } from 'react'
import { useIssues } from '../hooks'
import { IssueList, LabelPicker } from '../components'
import { LoadingIcon } from '../../shared'
import { State } from '../interfaces'

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [stateIssues, setStateIssues] = useState<State>()
  const { issuesQuery, page, prevPage, nextPage } = useIssues({ labels: selectedLabels, stateIssues })

  const onLabelChanged = (labelName: string) => {
    (selectedLabels.includes(labelName))
      ? setSelectedLabels(selectedLabels.filter(label => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName])
  }

  return (
    <div className='row mt-5'>
      <div className='col-8'>
        {
          issuesQuery.isLoading
            ? (<LoadingIcon />)
            : (
              <IssueList
                issues={(issuesQuery.data) ?? []}
                stateIssues={stateIssues}
                onStateChanged={(newState) => setStateIssues(newState)}
              />
            ) // eslint-disable-line
        }

        {/* Pagination */}
        <div className='d-flex justify-content-between align-items-center mt-2'>
          <button
            onClick={prevPage}
            disabled={issuesQuery.isFetching || page === 1}
            className='btn btn-outline-primary'
          >Prev
          </button>
          <span>{page}</span>
          <button
            onClick={nextPage}
            disabled={issuesQuery.isFetching}
            className='btn btn-outline-primary'
          >Next
          </button>
        </div>
      </div>

      <div className='col-4'>
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={onLabelChanged}
        />
      </div>
    </div>
  )
}
