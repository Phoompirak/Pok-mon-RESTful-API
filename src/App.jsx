import './App.css'
import Footer from './component/Footer/Footer'

/* import component */
import Navbar from './component/Navbar/Navbar'
import SearchFilter from './component/SearchFilter/SearchFilter'

/*                  
                    App
                     |
                     |
                     |
            -------------------------------
            |               |             |
            |               |             |
      Navigation      SearchFilter    Footer
            |                |
          Sidebar        Content---- path DetailPokemon
                            |
                        ItemContent
*/

function App() {
  return (
    <div className='App'>
      <Navbar /> {/* แถบนำทาง */}
      <SearchFilter /> {/* ค้นหาโปเกม่อน และข้อมูลContentรูปต่างๆของโเกม่อน */}
      <Footer /> {/* ส่วนท้าย */}
    </div>
  )
}

export default App
