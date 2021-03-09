export const PATH_1_NAME = 'Talent Path 1'
export const PATH_2_NAME = 'Talent Path 2'
export const PATH_TESTID_INFIX = '-to-'
export const SPRITE_INACTIVE_SUFFIX = '-inactive'
export const START_POINTS = 6
export const TALENT_BOAT = 'Boat'
export const TALENT_CAKE = 'Cake'
export const TALENT_CHEVRONS = 'Chevrons'
export const TALENT_CROWN = 'Crown'
export const TALENT_LIGHTNING = 'Lightning'
export const TALENT_SCUBA = 'Scuba'
export const TALENT_SILVERWARE = 'Silverware'
export const TALENT_SKULL = 'Skull'
export const TITLE_TEXT = 'TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000'

export const TALENT_PATHS = [PATH_1_NAME, PATH_2_NAME]
export const TALENTS_BY_PATH = {
  [PATH_1_NAME]: [
    TALENT_CHEVRONS,
    TALENT_SILVERWARE,
    TALENT_CAKE,
    TALENT_CROWN
  ],
  [PATH_2_NAME]: [
    TALENT_BOAT,
    TALENT_SCUBA,
    TALENT_LIGHTNING,
    TALENT_SKULL
  ]
}

const SPRITE_TALENTS = [
  TALENT_CHEVRONS,
  TALENT_SILVERWARE,
  TALENT_CAKE,
  TALENT_CROWN,
  TALENT_BOAT,
  TALENT_SCUBA,
  TALENT_LIGHTNING,
  TALENT_SKULL
]
const TALENT_SPRITE_IMAGE_SIZE = 50

export const TALENT_SPRITESHEET_DATA = SPRITE_TALENTS.reduce((data, talent, i) => {
  data[talent] = {
    x: i * TALENT_SPRITE_IMAGE_SIZE,
    y: 0,
    width: TALENT_SPRITE_IMAGE_SIZE,
    height: TALENT_SPRITE_IMAGE_SIZE
  }
  data[talent + SPRITE_INACTIVE_SUFFIX] = { ...data[talent], y: TALENT_SPRITE_IMAGE_SIZE }
  return data
}, {})
