import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import ItemContent from '../Content/ItemContent'
import styles from './Favorite.module.css'

const Favorite = () => {
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
        const favPoke = new Map(JSON.parse(sessionStorage.getItem('favPoke'))) || new Map();
        console.log("favPoke:", favPoke)
        getFavPokemon(Array.from(favPoke.keys()));
    }, [])
    console.log(favPokemon)
    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.wrapper}>
                {favPokemon && favPokemon?.map((pokemon, index) => (
                    <ItemContent key={index} value={pokemon} />
                ))}
            </div>
        </div >
    )
}

export default Favorite
