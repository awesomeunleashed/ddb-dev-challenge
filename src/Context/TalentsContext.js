import { createContext, useState } from 'react'
import { ALL_TALENTS, START_POINTS } from 'Util/constants'

export const TalentsContext = createContext(null)

const initialState = {
  points: START_POINTS,
  talents: ALL_TALENTS.reduce((all, t) => {
    all[t] = false
    return all
  }, {})
}

export const TalentsProvider = ({ children }) => {
  const [{ points, talents }, setState] = useState(initialState)
  return (
    <TalentsContext.Provider value={{
      points,
      isTalentActive: name => talents[name],
      setTalentActive: (name, active) => {
        if (talents[name] === undefined || talents[name] === active) {
          return
        }
        const newTalents = { ...talents }
        newTalents[name] = active
        setState({
          points: active ? points - 1 : points + 1,
          talents: newTalents
        })
      }
    }}
    >
      {children}
    </TalentsContext.Provider>
  )
}
