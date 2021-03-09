import background from 'Images/talent-calc-bg.png'
import { TITLE_TEXT } from 'Util/constants'

const App = () => (
  <div className='app' style={{ backgroundImage: `url(${background})` }}>
    <div className='header'>{TITLE_TEXT}</div>
  </div>
)

export default App
