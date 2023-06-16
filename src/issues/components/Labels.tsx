import { Label } from '../interfaces/issue'

interface Props {
  label: Label
}

export const Labels = ({ label }: Props) => {
  return (
    <span
      className='badge rounded-pill m-1'
      style={{ backgroundColor: `#${label.color}`, color: 'black' }}
    >
      {label.name}
    </span>
  )
}
