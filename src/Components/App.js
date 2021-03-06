import { TalentsProvider } from 'Context/TalentsContext'
import backgroundImage from 'Images/talent-calc-bg.png'
import { TALENTS_BY_PATH, TALENT_PATHS, TITLE_TEXT } from 'Util/constants'
import Points from './Points'
import TalentPath from './TalentPath'

const App = () => (
  <div className='app' style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className='header'>{TITLE_TEXT}</div>
    <div className='body'>
      <TalentsProvider>
        <div className='talent-paths'>
          {TALENT_PATHS.map((p, i) => <TalentPath key={i} name={p} talents={TALENTS_BY_PATH[p]} />)}
        </div>
        <Points />
      </TalentsProvider>
    </div>
  </div>
)

export default App
