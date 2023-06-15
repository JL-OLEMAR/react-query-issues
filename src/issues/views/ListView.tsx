import { useState } from 'react'
import { useIssues } from '../hooks'
import { IssueList, LabelPicker } from '../components'
import { LoadingIcon } from '../../shared'

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const { issuesQuery } = useIssues()

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
            ? <LoadingIcon />
            : <IssueList issues={issuesQuery.data ?? []} />
        }
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
