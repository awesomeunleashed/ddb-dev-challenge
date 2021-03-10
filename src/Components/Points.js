import { TalentsContext } from 'Context/TalentsContext'
import { useContext } from 'react'
import { POINTS_SPENT_LABEL, START_POINTS } from 'Util/constants'

const Points = () => {
  const { points } = useContext(TalentsContext)

  return (
    <div className='points-display'>
      <div>{START_POINTS - points} / {START_POINTS}</div>
      <div className='label'>{POINTS_SPENT_LABEL}</div>
    </div>
  )
}

export default Points
