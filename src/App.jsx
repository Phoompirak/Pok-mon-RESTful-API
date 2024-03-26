import './App.css'

/* import component */
import Navbar from './component/Navbar/Navbar'
import SearchFilter from './component/SearchFilter/SearchFilter'
import Test from './component/Test'

function App() {
  return (
    <div className='App'>
      {/* <Test /> */}
      <Navbar />
      <SearchFilter />
    </div>
  )
}

export default App
