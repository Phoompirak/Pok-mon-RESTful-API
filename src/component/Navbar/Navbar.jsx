import React, { useState, useEffect } from 'react'
import styles from '../Navbar/Navbar.module.css'
import Sidebar from '../Sidebar/Sidebar'

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
            <li><button>Home</button></li>
            <li><button>Faviorite</button></li>
            <li><button>Origin</button></li>
            <li><button>About</button></li>
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
