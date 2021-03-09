import { createContext, useState } from 'react'
import { START_POINTS } from 'Util/constants'

export const PointsContext = createContext(null)

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(START_POINTS)
  return (
    <PointsContext.Provider value={{ points, setPoints }}>
      {children}
    </PointsContext.Provider>
  )
}
