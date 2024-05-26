import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import ItemContent from '../Content/ItemContent'
import styles from './Faviorite.module.css'
import Footer from '../Footer/Footer'

const Favorite = () => {
    /* ดึงข้อมูลโปเกม่อนตามที่userกดชอบมา */
    const [favPokemon, setFavPokemon] = useState([]);

    const getFavPokemon = async (pokemons) => {
        try {
            const pokeData = await Promise.all(
                pokemons.map(async (name) => {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                    return response.data;
                })
            );
            setFavPokemon(pokeData); // Update state with fetched Pokemon data
        } catch (error) {
            console.error('Error fetching Pokemon:', error);
            setFavPokemon([]); // Set to empty array or handle error state
        }
    };

    useEffect(() => {
        const favPoke = new Map(JSON.parse(sessionStorage.getItem('favPoke'))) || new Map(); /* นำค่าที่อยู่ในsessionStorage มาใช้ซึ่งเราใช้Object Map */
        console.log("favPoke:", favPoke)
        getFavPokemon(Array.from(favPoke.keys()));
    }, [])
    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    {
                        favPokemon?.length > 0 ? favPokemon?.map((pokemon, index) => (
                            <ItemContent key={index} value={pokemon} />
                        ))
                            : <p className={styles.no_favpoke}>Don't have faviorite Pokemon</p>
                    }
                </div>
            </div >
            <div className={styles.footer}>
                <Footer />
            </div>
        </>
    )
}

export default Favorite
