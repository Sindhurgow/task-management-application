// EditWrapper.jsx
import { useParams } from 'react-router-dom'
import Edit from './edit' // your existing class component

const EditWrapper = () => {
  const params = useParams()
  return <Edit params={params} />
}

export default EditWrapper
