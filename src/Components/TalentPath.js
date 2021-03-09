import { PATH_TESTID_INFIX } from 'Util/constants'
import Talent from './Talent'

const TalentPath = ({ name, talents }) => {
  return (
    <div className='path'>
      <div className='path-name'>{name}</div>
      <div className='talents'>
        {talents.reduce((elements, talent, i) => {
          if (i > 0) {
            const id = `${talents[i - 1]}${PATH_TESTID_INFIX}${talent}`
            elements.push(<div className='flow' key={id} data-testid={id} />)
          }
          elements.push(<Talent key={i} name={talent} active={false} />)
          return elements
        }, [])}
      </div>
    </div>
  )
}

export default TalentPath
