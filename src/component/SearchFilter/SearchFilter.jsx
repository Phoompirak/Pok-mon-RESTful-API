/* import CSS and Icons */
import styles from '../SearchFilter/SearchFilter.module.css'
import { FaSearch } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

import { useState, useEffect, useCallback } from 'react';

/* Component content ไว้ส่งค่าที่searchไปให้contentโหลด */
import Content from '../Content/Content';

export default function SearchFilter() {
    /* Search แบบค้นหาแต่โปเกม่อนที่อยู่หน้าปัจจุบัน ซึ่งเว็บนี้มีโปเกม่อน25ตัว ต่อหน้า */
    const [searchData, setSearchData] = useState(''); /* ค่าที่User Search เปลี่ยนทุกครั้งที่พิมพ์ */
    const [dbValue, setDbValue] = useState(''); /* ค่าที่User search เหมือนกันแต่จะอัพเดทตอนที่userเลิกพิมพ์ 0.8วิ */

    
    /* เมื่อกดผุ่มค้นหาหรือEnterจะfilterเอาแค่ชื่อโปเกม่อนทุกตัวที่userกรอก */
    const [focus, setFocus] = useState(false);

    /* Clean up function ไว้delayต่าตอนuser search */
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDbValue(searchData.toLowerCase());
        }, 800);

        return () => {
            clearInterval(timerId);
        };
    }, [searchData])

    /* เช็คว่า user กด enterมาไหม ถ้ากดก็ให้ค้นหาหรือEnterจะfilterเอาแค่ชื่อโปเกม่อนทุกตัวที่userกรอก */
    const handleEnter = useCallback((e) => {
        if (e.key === 'Enter' && dbValue !== '') {
            e.preventDefault()
            setFocus(true);
            console.log(e.key, focus)
        } else {
            setFocus(false);
        }
    }, [dbValue, focus]);

    return (
        <div className={styles.container}>
            <form onSubmit={e => e.preventDefault()}>
                <div className={styles.wrapper}>
                    <div className={styles.wrap_search}>
                        <input
                            id="search"
                            type="text"
                            placeholder='Search Pokémon'
                            onChange={(e) => setSearchData(e.target.value)}
                            onKeyUp={handleEnter}
                        />
                        <div
                            className={styles.btn_close}
                            onClick={() => window.location.reload()}>
                            <IoIosClose />
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            setDbValue(searchData)
                            setFocus(true)
                        }}
                        type='button'
                    >
                        <FaSearch />
                    </button>
                </div>
            </form>
            
            {/* เนื้อหาโปเกม่อน ซึ่งส่งค่าที่ user searchไปให้contentจัดการต่อ */}
            <Content searchPoke={dbValue.toLowerCase().replace(/\s/g, "")} focusSearch={focus} />
        </div>
    )
}
