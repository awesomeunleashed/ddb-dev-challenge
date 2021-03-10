import { fireEvent, getByTestId, render } from '@testing-library/react'
import Talent from './Talent'
import { SPRITE_CSS_VAR, SPRITE_TALENTS, TALENT_BOAT, TALENT_CAKE } from 'Util/constants'
import { TalentsContext } from 'Context/TalentsContext'

describe('Talent', () => {
  it('should render correctly when inactive', () => {
    const { getByTitle } = render(
      <TalentsContext.Provider value={{ isTalentActive: name => name !== TALENT_BOAT }}>
        <Talent name={TALENT_BOAT} disabled={false} />
      </TalentsContext.Provider>
    )
    const button = getByTitle(TALENT_BOAT)
    expect(button).not.toHaveClass('active')
    expect(button).toBeEnabled()
    expect(getByTestId(button, TALENT_BOAT)).toHaveStyle(`${SPRITE_CSS_VAR}: ${SPRITE_TALENTS.indexOf(TALENT_BOAT)}`)
  })

  it('should render correctly when active', () => {
    const { getByTitle } = render(
      <TalentsContext.Provider value={{ isTalentActive: name => name === TALENT_CAKE }}>
        <Talent name={TALENT_CAKE} disabled={false} />
      </TalentsContext.Provider>
    )
    const button = getByTitle(TALENT_CAKE)
    expect(button).toHaveClass('active')
    expect(button).toBeEnabled()
    expect(getByTestId(button, TALENT_CAKE)).toHaveStyle(`${SPRITE_CSS_VAR}: ${SPRITE_TALENTS.indexOf(TALENT_CAKE)}`)
  })

  it('should render correctly when disabled', () => {
    const { getByTitle } = render(
      <TalentsContext.Provider value={{ isTalentActive: () => true }}>
        <Talent name={TALENT_BOAT} disabled />
      </TalentsContext.Provider>
    )
    expect(getByTitle(TALENT_BOAT)).toBeDisabled()
  })

  it('should activate talent when enabled and clicked', () => {
    const mockActivate = jest.fn()
    const { getByTitle } = render(
      <TalentsContext.Provider value={{ isTalentActive: () => true, setTalentActive: mockActivate }}>
        <Talent name={TALENT_BOAT} disabled={false} />
      </TalentsContext.Provider>
    )
    fireEvent.click(getByTitle(TALENT_BOAT))
    expect(mockActivate).toHaveBeenCalledTimes(1)
    expect(mockActivate).toHaveBeenCalledWith(TALENT_BOAT, true)
  })
})
