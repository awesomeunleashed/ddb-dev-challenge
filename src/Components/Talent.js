import { SPRITE_CSS_VAR, SPRITE_TALENTS } from 'Util/constants'

const Talent = ({ name, active, activate }) => {
  let className = 'talent'
  if (active) {
    className += ' active'
  }
  return (
    <button className={className} disabled={!activate} title={name} onClick={activate}>
      <div data-testid={name} style={{ [SPRITE_CSS_VAR]: SPRITE_TALENTS.indexOf(name) }} />
    </button>
  )
}

export default Talent
