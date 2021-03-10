import { TalentsContext } from 'Context/TalentsContext'
import { render } from '@testing-library/react'
import { POINTS_SPENT_LABEL, START_POINTS } from 'Util/constants'
import Points from './Points'

describe('Points', () => {
  it('should render the points display', () => {
    const points = 4
    const { getByText } = render(
      <TalentsContext.Provider value={{ points }}>
        <Points />
      </TalentsContext.Provider>
    )

    expect(getByText(`${START_POINTS - points} / ${START_POINTS}`)).toBeInTheDocument()
    expect(getByText(POINTS_SPENT_LABEL)).toBeInTheDocument()
  })
})
