import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import styles from './Sidebar.module.css'
// import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'

function Sidebar({ openSide, setopenSide }) {
  return (
    <div>
      <aside className={openSide ? `${styles.side_bar} ${styles.active}` : styles.side_bar}>
        <button onClick={() => setopenSide(!openSide)}>
          <AiOutlineClose />
        </button>
        <ul className={styles.side_menu_items}>
          {
            SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  {item.icon}
                  <span>{item.title}</span>
                </li>
              )
            })
          }
        </ul>
      </aside>
    </div>
  )
}

export default Sidebar
