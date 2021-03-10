import { fireEvent, getByTestId, render } from '@testing-library/react'
import Talent from './Talent'
import { SPRITE_CSS_VAR, SPRITE_TALENTS, TALENT_BOAT, TALENT_CAKE } from 'Util/constants'
import { TalentsContext } from 'Context/TalentsContext'

describe('Talent', () => {
  const renderTalent = (name, disabled, isTalentActive, setTalentActive) => render(
    <TalentsContext.Provider value={{ isTalentActive, setTalentActive }}>
      <Talent name={name} disabled={disabled} />
    </TalentsContext.Provider>
  )

  it('should render correctly when inactive', () => {
    const { getByTitle } = renderTalent(TALENT_BOAT, false, name => name !== TALENT_BOAT)
    const button = getByTitle(TALENT_BOAT)
    expect(button).not.toHaveClass('active')
    expect(button).toBeEnabled()
    expect(getByTestId(button, TALENT_BOAT)).toHaveStyle(`${SPRITE_CSS_VAR}: ${SPRITE_TALENTS.indexOf(TALENT_BOAT)}`)
  })

  it('should render correctly when active', () => {
    const { getByTitle } = renderTalent(TALENT_CAKE, false, name => name === TALENT_CAKE)
    const button = getByTitle(TALENT_CAKE)
    expect(button).toHaveClass('active')
    expect(button).toBeEnabled()
    expect(getByTestId(button, TALENT_CAKE)).toHaveStyle(`${SPRITE_CSS_VAR}: ${SPRITE_TALENTS.indexOf(TALENT_CAKE)}`)
  })

  it('should render correctly when disabled', () => {
    const { getByTitle } = renderTalent(TALENT_BOAT, true, () => true)
    expect(getByTitle(TALENT_BOAT)).toBeDisabled()
  })

  it('should activate talent when enabled and clicked', () => {
    const mockSetActive = jest.fn()
    const { getByTitle } = renderTalent(TALENT_BOAT, false, () => false, mockSetActive)
    fireEvent.click(getByTitle(TALENT_BOAT))
    expect(mockSetActive).toHaveBeenCalledTimes(1)
    expect(mockSetActive).toHaveBeenCalledWith(TALENT_BOAT, true)
  })

  it('should deactivate talent when enabled and right-clicked', () => {
    const mockSetActive = jest.fn()
    const { getByTitle } = renderTalent(TALENT_BOAT, false, () => true, mockSetActive)
    fireEvent.contextMenu(getByTitle(TALENT_BOAT))
    expect(mockSetActive).toHaveBeenCalledTimes(1)
    expect(mockSetActive).toHaveBeenCalledWith(TALENT_BOAT, false)
  })

  it('should not deactivate talent when disabled and right-clicked', () => {
    const mockSetActive = jest.fn()
    const { getByTitle } = renderTalent(TALENT_BOAT, true, () => true, mockSetActive)
    fireEvent.contextMenu(getByTitle(TALENT_BOAT))
    expect(mockSetActive).not.toHaveBeenCalled()
  })
})
