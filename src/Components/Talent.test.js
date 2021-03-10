import { fireEvent, getByTestId, render } from '@testing-library/react'
import Talent from './Talent'
import { SPRITE_CSS_VAR, SPRITE_TALENTS, TALENT_BOAT, TALENT_CAKE } from 'Util/constants'

describe('Talent', () => {
  it('should render correctly when inactive', () => {
    const { getByTitle } = render(<Talent name={TALENT_BOAT} active={false} />)
    const button = getByTitle(TALENT_BOAT)
    expect(button).not.toHaveClass('active')
    expect(getByTestId(button, TALENT_BOAT)).toHaveStyle(`${SPRITE_CSS_VAR}: ${SPRITE_TALENTS.indexOf(TALENT_BOAT)}`)
  })

  it('should render correctly when active', () => {
    const { getByTitle } = render(<Talent name={TALENT_CAKE} active />)
    const button = getByTitle(TALENT_CAKE)
    expect(button).toHaveClass('active')
    expect(getByTestId(button, TALENT_CAKE)).toHaveStyle(`${SPRITE_CSS_VAR}: ${SPRITE_TALENTS.indexOf(TALENT_CAKE)}`)
  })

  it('should call activate prop when clicked', () => {
    const mockActivate = jest.fn()
    const { getByTitle } = render(<Talent name={TALENT_BOAT} active={false} activate={mockActivate} />)
    fireEvent.click(getByTitle(TALENT_BOAT))
    expect(mockActivate).toHaveBeenCalledTimes(1)
  })

  it('should be disabled if activate function is not provided', () => {
    const { getByTitle } = render(<Talent name={TALENT_BOAT} active={false} activate={null} />)
    expect(getByTitle(TALENT_BOAT)).toBeDisabled()
  })
})
