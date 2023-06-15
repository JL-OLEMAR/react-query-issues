import { useQuery } from '@tanstack/react-query'
import { getLabels } from '../../api'

export function useLabels() {
  const labelsQuery = useQuery(
    ['labels'],
    getLabels,
    {
      staleTime: 1000 * 60 * 60, // 1 hour - evita hacer fetching instantaneamente, se repeta el tiempo establecido
      // initialData: [hereData], muestra la data precargada pero espera que staleTime para hacer la petición a la Api,
      // placeholderData: [hereData], muestra la data precargada e inmediatamente hace la petición a la Api SIN esperar al staleTime
      placeholderData: [
        {
          id: 725156255,
          node_id: 'MDU6TGFiZWw3MjUxNTYyNTU=',
          url: 'https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)',
          name: 'good first issue (taken)',
          color: 'b60205',
          default: false
        },
        {
          id: 717031390,
          node_id: 'MDU6TGFiZWw3MTcwMzEzOTA=',
          url: 'https://api.github.com/repos/facebook/react/labels/good%20first%20issue',
          name: 'good first issue',
          color: '6ce26a',
          default: true
        }
      ]
    }
  )

  return labelsQuery
}
