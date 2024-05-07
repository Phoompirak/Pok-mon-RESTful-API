import './App.css'
import Footer from './component/Footer/Footer'

/* import component */
import Navbar from './component/Navbar/Navbar'
import SearchFilter from './component/SearchFilter/SearchFilter'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <SearchFilter />
      <Footer />
    </div>
  )
}

export default App
