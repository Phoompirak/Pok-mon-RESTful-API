import styles from '../SearchFilter/SearchFilter.module.css'
import { FaSearch } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

import { useState, useEffect, useCallback } from 'react';

import Pagination from '../Pagination/Pagination';

export default function SearchFilter() {
    const [searchData, setSearchData] = useState('');
    const [dbValue, setDbValue] = useState('');
    const [focus, setFocus] = useState(false);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDbValue(searchData.toLowerCase());
        }, 800);

        return () => {
            clearInterval(timerId);
        };
    }, [searchData])

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

            <Pagination searchPoke={dbValue.toLowerCase().replace(/\s/g, "")} focusSearch={focus} />
        </div>
    )
}
