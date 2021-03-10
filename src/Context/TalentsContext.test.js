import { act, render } from '@testing-library/react'
import { useContext } from 'react'
import { ALL_TALENTS, START_POINTS, TALENT_BOAT } from 'Util/constants'
import { TalentsContext, TalentsProvider } from './TalentsContext'

describe('TalentsContext', () => {
  let gotContext = null
  beforeEach(() => {
    gotContext = null
  })

  const MockConsumer = () => {
    const context = useContext(TalentsContext)
    gotContext = context
    return <div data-testid='mock-consumer' />
  }

  it('should render children and provide points and talent status values', () => {
    const { getByTestId } = render(
      <TalentsProvider>
        <MockConsumer />
      </TalentsProvider>
    )
    expect(getByTestId('mock-consumer')).toBeInTheDocument()
    expect(gotContext.points).toBe(START_POINTS)
    for (const talent of ALL_TALENTS) {
      expect(gotContext.isTalentActive(talent)).toBe(false)
    }
  })

  it('should provide function to activate and deactivate talents', () => {
    render(
      <TalentsProvider>
        <MockConsumer />
      </TalentsProvider>
    )
    act(() => gotContext.setTalentActive(TALENT_BOAT, true))
    expect(gotContext.isTalentActive(TALENT_BOAT)).toBe(true)
    expect(gotContext.points).toBe(START_POINTS - 1)

    act(() => gotContext.setTalentActive(TALENT_BOAT, false))
    expect(gotContext.isTalentActive(TALENT_BOAT)).toBe(false)
    expect(gotContext.points).toBe(START_POINTS)
  })

  it('should not change provided context when activating an already-active talent', () => {
    render(
      <TalentsProvider>
        <MockConsumer />
      </TalentsProvider>
    )
    act(() => gotContext.setTalentActive(TALENT_BOAT, true))
    const oldGotContext = gotContext
    act(() => gotContext.setTalentActive(TALENT_BOAT, true))
    expect(oldGotContext).toBe(gotContext)
  })

  it('should not change provided context when changing a talent that does not exist', () => {
    render(
      <TalentsProvider>
        <MockConsumer />
      </TalentsProvider>
    )
    const oldGotContext = gotContext
    act(() => gotContext.setTalentActive('bob', true))
    expect(oldGotContext).toBe(gotContext)
  })
})
