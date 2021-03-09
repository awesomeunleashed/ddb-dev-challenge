import { render } from '@testing-library/react'
import TalentPath from './TalentPath'
import { renderedProps } from './Talent'
import { PATH_TESTID_INFIX } from 'Util/constants'

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
    'talent 3',
    'talent 4'
  ]

  it('should render the name, talents, and paths between them correctly', () => {
    const { getByTestId, getByText } = render(<TalentPath name={mockPathName} talents={mockTalents} />)
    expect(getByText(mockPathName)).toBeInTheDocument()
    for (const talentName of mockTalents) {
      expect(getByTestId(talentName)).toBeInTheDocument()
      expect(renderedProps[talentName].active).toBe(false)
    }
    for (let i = 1; i < mockTalents.length; i++) {
      expect(getByTestId(`${mockTalents[i - 1]}${PATH_TESTID_INFIX}${mockTalents[i]}`)).not.toHaveClass('active')
    }
  })
})
