import React, { useState, useEffect } from 'react'
import styles from '../Content/Content.module.css'

function Content({ searchPoke }) {
    // cache
    const [dbValue, setDbValue] = useState('');
    const [pokemon, setPokemon] = useState([]); //cache ของ ข้อมูลpokemon

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function fetchPokemon(BASE_URL) {
        const res = await fetch(BASE_URL)
            .then(res => res.json())
            .then(data => data.results)
            .catch(err => console.log(`Error fetching pokemon: ${err}`))

        const pokemonData = [];
        for (const result of res) {
            try {
                const pokeRes = await fetch(result.url)
                    .then(res => res.json());
                pokemonData.push(pokeRes);
                setPokemon(pokemonData)
                await sleep(100); // delay โหลดpokemon ทีละตัว
            }
            catch (err) {
                console.log(`Error fetching pokemon: ${err}`)
            }
        }
        // โหลดแบบครั้งเดียวรวด ซึ่งนานเกินไป แถมโดนAPIบล็อก
        // const pokemonData = await Promise.all(pokemonPromises);
        setPokemon(pokemonData);
    }

    useEffect(() => {
        fetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=1000000&offset=0')
    }, [])

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDbValue(searchPoke.toLowerCase());
        }, 800);

        return () => {
            clearInterval(timerId);
        };
    }, [searchPoke])
    return (
        <div className={styles.con}>
            {
                pokemon.length != 0 ?
                    pokemon.filter(item => {
                        return (
                            dbValue.toLowerCase() == ''
                                ? item
                                : item.name.toLowerCase().includes(dbValue)
                        )
                    }).map((value, index) => (
                        value.sprites.other.home.front_default == null ? setDbValue(dbValue)
                            : <div className={styles.item} key={index}>
                                <img src={value.sprites.other.home.front_default} alt="" />
                                <h3>Name: {value.name}</h3>
                                <ul>
                                    <h4>Type:</h4>
                                    {
                                        value.types.map((skill, index) => (
                                            <li key={index}>{skill.type.name}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                    ))
                    : <p className={styles.loading_pokemon}>Loading pokemon...</p>
            }
        </div>
    )
}

export default Content
