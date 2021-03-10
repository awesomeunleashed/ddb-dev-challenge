import { TalentsContext } from 'Context/TalentsContext'
import { useContext } from 'react'
import { SPRITE_CSS_VAR, SPRITE_TALENTS } from 'Util/constants'

const Talent = ({ name, disabled }) => {
  const { isTalentActive, setTalentActive } = useContext(TalentsContext)
  let className = 'talent'
  if (isTalentActive(name)) {
    className += ' active'
  }
  return (
    <button
      className={className} disabled={disabled} title={name}
      onClick={() => setTalentActive(name, true)}
      onContextMenu={e => {
        e.preventDefault()
        if (!disabled) {
          setTalentActive(name, false)
        }
      }}
    >
      <div data-testid={name} style={{ [SPRITE_CSS_VAR]: SPRITE_TALENTS.indexOf(name) }} />
    </button>
  )
}

export default Talent
