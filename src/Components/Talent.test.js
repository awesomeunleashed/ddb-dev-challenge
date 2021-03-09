import { fireEvent, getByTestId, render } from '@testing-library/react'
import Talent from './Talent'
import talentIcons from 'Images/talent-icons-sprite.png'
import { SPRITE_INACTIVE_SUFFIX, TALENT_SPRITESHEET_DATA } from 'Util/constants'

jest.mock('react-spritesheet', () => ({
  SpriteSheet: ({ data, ...props }) => <div data-testid='mock-spritesheet' data={JSON.stringify(data)} {...props} />
}))

describe('Talent', () => {
  const mockTalent = 'Mock Talent'

  it('should render correctly when inactive', () => {
    const { getByTitle } = render(<Talent name={mockTalent} active={false} />)
    const button = getByTitle(mockTalent)
    expect(button).not.toHaveClass('active')
    const sprite = getByTestId(button, 'mock-spritesheet')
    expect(sprite).toHaveAttribute('filename', talentIcons)
    expect(sprite).toHaveAttribute('data', JSON.stringify(TALENT_SPRITESHEET_DATA))
    expect(sprite).toHaveAttribute('sprite', mockTalent + SPRITE_INACTIVE_SUFFIX)
  })

  it('should render correctly when active', () => {
    const mockTalent2 = 'Mock Talent 2'
    const { getByTitle } = render(<Talent name={mockTalent2} active />)
    const button = getByTitle(mockTalent2)
    expect(button).toHaveClass('active')
    expect(getByTestId(button, 'mock-spritesheet')).toHaveAttribute('sprite', mockTalent2)
  })

  it('should call activate prop when clicked', () => {
    const mockActivate = jest.fn()
    const { getByTitle } = render(<Talent name={mockTalent} active={false} activate={mockActivate} />)
    fireEvent.click(getByTitle(mockTalent))
    expect(mockActivate).toHaveBeenCalledTimes(1)
  })

  it('should be disabled if activate function is not provided', () => {
    const { getByTitle } = render(<Talent name={mockTalent} active={false} activate={null} />)
    expect(getByTitle(mockTalent)).toBeDisabled()
  })
})
