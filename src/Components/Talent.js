import { SpriteSheet } from 'react-spritesheet'
import talentIcons from 'Images/talent-icons-sprite.png'
import { SPRITE_INACTIVE_SUFFIX, TALENT_SPRITESHEET_DATA } from 'Util/constants'

const Talent = ({ name, active, activate }) => {
  let sprite = name
  let className = 'talent'
  if (active) {
    className += ' active'
  } else {
    sprite += SPRITE_INACTIVE_SUFFIX
  }
  return (
    <button className={className} disabled={!activate} title={name} onClick={activate}>
      <SpriteSheet
        filename={talentIcons}
        data={TALENT_SPRITESHEET_DATA}
        sprite={sprite}
      />
    </button>
  )
}

export default Talent
