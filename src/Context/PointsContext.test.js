import { act, render } from '@testing-library/react'
import { useContext } from 'react'
import { START_POINTS } from 'Util/constants'
import { PointsContext, PointsProvider } from './PointsContext'

describe('PointsContext', () => {
  let gotSetPoints = null
  beforeEach(() => {
    gotSetPoints = null
  })

  const MockConsumer = () => {
    const { points, setPoints } = useContext(PointsContext)
    gotSetPoints = setPoints
    return (
      <div data-testid='mock-consumer'>
        {points}
      </div>
    )
  }

  it('should render children and provide points value', () => {
    const { getByTestId } = render(
      <PointsProvider>
        <MockConsumer />
      </PointsProvider>
    )
    expect(getByTestId('mock-consumer')).toHaveTextContent(START_POINTS)
  })

  it('should provide function to set points value', () => {
    const { getByTestId } = render(
      <PointsProvider>
        <MockConsumer />
      </PointsProvider>
    )
    const newPoints = 3
    act(() => gotSetPoints(newPoints))
    expect(getByTestId('mock-consumer')).toHaveTextContent(newPoints)
  })
})
