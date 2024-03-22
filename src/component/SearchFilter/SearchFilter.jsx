import styles from '../SearchFilter/SearchFilter.module.css'
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from 'react';

import Content from '../Content/Content';

export default function SearchFilter() {
    const [searchData, setSearchData] = useState('');
    const [dbValue, setDbValue] = useState('');

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDbValue(searchData.toLowerCase());
        }, 800);

        return () => {
            clearInterval(timerId);
        };
    }, [searchData])
    return (
        <div className={styles.container}>
            <form action="">
                <label htmlFor="search"><FaSearch /></label>
                <input
                    id="search"
                    type="text"
                    placeholder='Search Pokémon'
                    onChange={e => setSearchData(e.target.value)} />
            </form>

            <Content searchPoke={dbValue.toLowerCase().replace(/\s/g, "")} />
        </div>
    )
}
