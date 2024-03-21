import './App.css'

/* import component */
import Navbar from './component/Navbar/Navbar'
import SearchFilter from './component/SearchFilter/SearchFilter'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <SearchFilter />
    </div>
  )
}

export default App
