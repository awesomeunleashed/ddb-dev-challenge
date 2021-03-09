import { render } from '@testing-library/react'
import { TALENTS_BY_PATH, TALENT_PATHS, TITLE_TEXT } from 'Util/constants'
import App from './App'
import { renderedProps } from './TalentPath'

jest.mock('./TalentPath', () => {
  const mockTalentPath = { __esModule: true, renderedProps: {} }
  mockTalentPath.default = props => {
    mockTalentPath.renderedProps[props.name] = props
    return <div data-testid={props.name} />
  }
  return mockTalentPath
})

describe('App', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<App />)
    expect(getByText(TITLE_TEXT)).toBeInTheDocument()
    for (const path of TALENT_PATHS) {
      expect(getByTestId(path)).toBeInTheDocument()
      expect(renderedProps[path].talents).toBe(TALENTS_BY_PATH[path])
    }
  })
})
