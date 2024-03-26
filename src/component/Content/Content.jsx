import React, { useState, useEffect } from 'react'
import styles from '../Content/Content.module.css'
import ItemContent from './ItemContent';
import Loading from '../Loading/Loading';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const fetchPokemon = async (limit, offset) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).then((res) => res.json());
    const pokemonPromises = res.results.map(async (result) => {
        const pokeRes = await fetch(result.url).then((res) => res.json());
        await sleep(100);
        return pokeRes;
    });

    const pokemonData = await Promise.all(pokemonPromises);
    return pokemonData;
};

function Content({ searchPoke }) {
    // cache
    const [pokemon, setPokemon] = useState([]); //cache ของ ข้อมูลpokemon
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const limit = 30;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newPokemon = await fetchPokemon(limit, offset);
                setPokemon([...pokemon, ...newPokemon]);
            } catch (err) {
                console.log(`Error fetching pokemon: ${err}`);
            }
            setLoading(false)
        };
        fetchData();
    }, [offset]);

    const handleScroll = async () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 50) {
            setLoading(true);
            setOffset((prevOffset) => prevOffset + limit);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div className={styles.con}>
                {
                    pokemon.filter(item => {
                        return (
                            searchPoke.toLowerCase() == ''
                                ? item
                                : item.name.toLowerCase().replace(/\s/g, "").includes(searchPoke) // trime all space
                        )
                    }).map((value, index) => (
                        <ItemContent value={value} key={index} />
                    ))
                }
            </div>
            {
                loading && <Loading />
            }
        </>
    )
}

export default Content
