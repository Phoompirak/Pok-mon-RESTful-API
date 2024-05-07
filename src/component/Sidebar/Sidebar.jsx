import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import styles from './Sidebar.module.css'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'

function Sidebar({ openSide, setopenSide }) {
  return (
    <div>
      <div className={styles.bg_black}>
        <aside className={openSide ? `${styles.side_bar} ${styles.active}` : styles.side_bar}>
          <button onClick={() => setopenSide(!openSide)}>
            <AiOutlineClose />
          </button>
          <ul className={styles.side_menu_items}>
            {
              SidebarData.map((item, index) => {
                return (
                  <Link key={index} to={item.path} className={item.cName}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                )
              })
            }
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default Sidebar
