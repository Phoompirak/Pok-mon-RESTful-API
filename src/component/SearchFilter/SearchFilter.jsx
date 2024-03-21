import styles from '../SearchFilter/SearchFilter.module.css'
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';

import Content from '../Content/Content';

export default function SearchFilter() {
    const [searchData, setSearchData] = useState('');

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

            <Content searchPoke={searchData} />
        </div>
    )
}
