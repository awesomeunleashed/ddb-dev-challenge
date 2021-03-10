import { act, render } from '@testing-library/react'
import TalentPath from './TalentPath'
import { renderedProps } from './Talent'
import { PATH_TESTID_INFIX } from 'Util/constants'
import { TalentsContext } from 'Context/TalentsContext'
import { useState } from 'react'

jest.mock('./Talent', () => {
  const mockTalent = { __esModule: true, renderedProps: {} }
  mockTalent.default = props => {
    mockTalent.renderedProps[props.name] = props
    return <div data-testid={props.name} />
  }
  return mockTalent
})

describe('TalentPath', () => {
  const mockPathName = 'Mock Path'
  const mockTalents = [
    'talent 1',
    'talent 2',
    'talent 3'
  ]

  let mockSetPoints
  const PathWrapper = ({ startPoints, activeTalents }) => {
    const [points, setPoints] = useState(startPoints)
    mockSetPoints = setPoints
    return (
      <TalentsContext.Provider value={{ points, isTalentActive: name => activeTalents.includes(name) }}>
        <TalentPath name={mockPathName} talents={mockTalents} />
      </TalentsContext.Provider>
    )
  }

  it('should render the name, talents, and paths between them correctly', () => {
    const { getByTestId, getByText } = render(<PathWrapper startPoints={0} activeTalents={[mockTalents[0]]} />)
    expect(getByText(mockPathName)).toBeInTheDocument()

    expect(getByTestId(mockTalents[0])).toBeInTheDocument()
    expect(renderedProps[mockTalents[0]].disabled).toBe(false)
    expect(getByTestId(mockTalents[1])).toBeInTheDocument()
    expect(renderedProps[mockTalents[1]].disabled).toBe(true)
    expect(getByTestId(mockTalents[2])).toBeInTheDocument()
    expect(renderedProps[mockTalents[2]].disabled).toBe(true)

    for (let i = 1; i < mockTalents.length; i++) {
      expect(getByTestId(`${mockTalents[i - 1]}${PATH_TESTID_INFIX}${mockTalents[i]}`)).toBeInTheDocument()
    }
  })

  it('should enable next talent in the path while points are available', () => {
    const startPoints = 2
    render(<PathWrapper startPoints={startPoints} activeTalents={[mockTalents[0]]} />)

    expect(renderedProps[mockTalents[0]].disabled).toBe(false)
    expect(renderedProps[mockTalents[1]].disabled).toBe(false)
    expect(renderedProps[mockTalents[2]].disabled).toBe(true)

    act(() => mockSetPoints(0))

    expect(renderedProps[mockTalents[0]].disabled).toBe(false)
    expect(renderedProps[mockTalents[1]].disabled).toBe(true)
    expect(renderedProps[mockTalents[2]].disabled).toBe(true)
  })
})
