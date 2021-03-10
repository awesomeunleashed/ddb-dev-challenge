import { TalentsContext } from 'Context/TalentsContext'
import { useContext } from 'react'
import { PATH_TESTID_INFIX } from 'Util/constants'
import Talent from './Talent'

// TODO: remove talents. Can we do it with previous talents?

const TalentPath = ({ name, talents }) => {
  const { points, isTalentActive } = useContext(TalentsContext)

  return (
    <div className='path'>
      <div className='path-name'>{name}</div>
      <div className='talents'>
        {talents.reduce((elements, talent, i) => {
          let canChange = isTalentActive(talent) || points > 0
          if (i > 0) {
            const id = `${talents[i - 1]}${PATH_TESTID_INFIX}${talent}`
            elements.push(<div className='flow' key={id} data-testid={id} />)
            if (canChange && !isTalentActive(talents[i - 1])) {
              canChange = false
            }
          }
          if (canChange && i < talents.length - 1 && isTalentActive(talents[i + 1])) {
            canChange = false
          }
          elements.push(<Talent key={i} name={talent} disabled={!canChange} />)
          return elements
        }, [])}
      </div>
    </div>
  )
}

export default TalentPath
