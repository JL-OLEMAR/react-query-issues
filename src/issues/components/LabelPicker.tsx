import { FC } from 'react'
import { useLabels } from '../hooks'
import { LoadingIcon } from '../../shared'

interface Props {
  selectedLabels: string[]
  onChange: (labelName: string) => void
}

export const LabelPicker: FC<Props> = ({ selectedLabels, onChange }) => {
  const labelsQuery = useLabels()

  if (labelsQuery.isLoading) {
    return (<LoadingIcon />)
  }

  return (
    <>
      {
        labelsQuery.data?.map(label => (
          <span
            onClick={() => onChange(label.name)}
            key={label.id}
            className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name) ? 'label-active' : ''}`}
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
          >
            {label.name}
          </span>
        ))
      }

    </>
  )
}
