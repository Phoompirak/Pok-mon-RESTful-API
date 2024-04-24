import React, { useState, useEffect } from 'react'
import styles from '../Navbar/Navbar.module.css'
import Sidebar from '../Sidebar/Sidebar'
import { Link } from 'react-router-dom';

import { RxHamburgerMenu } from "react-icons/rx";
import { MdCatchingPokemon } from "react-icons/md";

function Navbar() {
  const [openSide, setOpenSide] = useState(false)
  const [widthWin, setWidthWin] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidthWin(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [widthWin]);

  useEffect(() => {
    if (widthWin > 700) {
      setOpenSide(false);
    }
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
            <Link to={'/favorite'}>Faviorite</Link>
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
        widthWin <= 700 ?
          <Sidebar openSide={openSide} setopenSide={setOpenSide} />
          : null
      }
    </div>
  )
}

export default Navbar
