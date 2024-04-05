import './App.css'

/* import component */
import Navbar from './component/Navbar/Navbar'
import SearchFilter from './component/SearchFilter/SearchFilter'
import Test from './component/Test'
import DetailPoke from './component/DetailPoke/DetailPoke'

function App() {
  return (
    <div className='App'>
      {/* <Test /> */}
      {/* <DetailPoke /> */}
      <Navbar />
      <SearchFilter />
    </div>
  )
}

export default App
