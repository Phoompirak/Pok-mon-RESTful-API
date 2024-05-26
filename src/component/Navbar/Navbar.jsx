import React, { useState, useEffect } from 'react'
import styles from '../Navbar/Navbar.module.css'

// component sidebar สำหรับมือถือ
import Sidebar from '../Sidebar/Sidebar'

// ลิ้งไปหน้าอื่น path
import { Link } from 'react-router-dom';

// เพิ่มไอคอนมาใช้
import { RxHamburgerMenu } from "react-icons/rx";
import { MdCatchingPokemon } from "react-icons/md";

function Navbar() {
  // ปุ่มเปิดปิดแถบSidebar สำหรับมือถือ
  const [openSide, setOpenSide] = useState(false)

  // ความของหน้าจอ
  const [widthWin, setWidthWin] = useState(window.innerWidth);

  /* อัพเดทค่าทุกครั้งที่มีการเปลี่ยนขนาดหน้าจอ */
  useEffect(() => {
    const handleResize = () => {
      setWidthWin(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [widthWin]);

  return (
    <div className={styles.container}>
      <nav className={styles.nav_con}>
        <div className={styles.side_btn}>
          <RxHamburgerMenu onClick={() => setOpenSide(!openSide)} />
          <MdCatchingPokemon />
        </div>
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/faviorite'}>Faviorite <span>{new Map(JSON.parse(sessionStorage.getItem('favPoke'))).size || 0}</span></Link>
          </li>
          <li>
            <a href='https://pokeapi.co/' target='_blank'>Origin</a>
          </li>
          <li>
            <Link to={'/about'}>About</Link>
          </li>
        </ul>
      </nav>
      {
        /* ถ้าขนาดหน้าจอเป็นมือถือ ให้แสดงปุ่มเปิดปิดSidebar */
        widthWin <= 700 ?
          <Sidebar openSide={openSide} setopenSide={setOpenSide} />
          : null
      }
    </div>
  )
}

export default Navbar
