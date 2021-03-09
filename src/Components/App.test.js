import { render } from '@testing-library/react'
import { TITLE_TEXT } from 'Util/constants'
import App from './App'

describe('App', () => {
  it('should render correctly', () => {
    const { getByText } = render(<App />)
    expect(getByText(TITLE_TEXT)).toBeInTheDocument()
  })
})
