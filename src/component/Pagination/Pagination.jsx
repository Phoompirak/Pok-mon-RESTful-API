import React, { useState, useEffect, useMemo } from 'react'
import styles from './Pagination.module.css'
import Loading from '../Loading/Loading'
import ItemContent from '../Content/ItemContent'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Pagination = ({ searchPoke, focusSearch }) => {
    const [data, setData] = useState({});
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);

    const [inputValue, setInputValue] = useState(1); // input Pages
    const limit = 20;

    const getPokemon = async (url) => {
        if (!url) {
            throw new Error("Not found url pokemon/api");
        }
        try {
            setLoading(true);
            const response = await axios.get(url)
            const pokeData = await response.data;
            // console.log(pokeData)
            setData(pokeData)
            setLoading(false);

            if (pokeData.results) {
                fetchAllPokemon(pokeData);
            }
        } catch (err) {
            console.log("Error fetching:", err)
            setLoading(true)
            return [];
        }
    };
    const fetchAllPokemon = async (pokeData) => {
        setLoading(true);
        try {
            const pokemonData = await Promise.all(
                pokeData.results.map(async (result) => {
                    const response = await axios.get(result.url);
                    const data = response.data;
                    return data;
                })
            );
            // console.log("pokemonData ", pokemonData)
            setPokemon(pokemonData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
            setLoading(false);
            return [];
        }
    };

    const handleKeyEnter = (e) => {
        if (e.key === 'Enter') {
            const valueInput = parseInt(e.target.value);
            let newPage = valueInput;
            if (valueInput < 1) {
                newPage = 1;
            } else if (valueInput > Math.floor(data?.count / limit) + 1) {
                newPage = Math.floor(data?.count / limit + 1);
            }
            getPokemon(`https://pokeapi.co/api/v2/pokemon?offset=${(newPage - 1) * limit}&limit=${limit}`);
            setInputValue(parseInt(newPage));
            console.log(`Input pages: https://pokeapi.co/api/v2/pokemon?offset=${(newPage - 1) * limit}&limit=${limit}`);
        }
    }

    const Test = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000');
            const data = await response.json();
            return data.results; // ส่งเฉพาะ results กลับไป
        } catch (error) {
            console.error('Error fetching:', error);
            return []; // ถ้ามีข้อผิดพลาดในการดึงข้อมูลให้ส่งอาเรย์ว่างออกมา
        }
    };

    const filteredPokemon = useMemo(() => {
        // console.log(pokemon)
        return Array.isArray(pokemon) ? pokemon?.filter((item) =>
            searchPoke.toLowerCase() === ''
                ? item
                : item.name.toLowerCase().replace(/\s/g, "").includes(searchPoke)
        )
            : [];
    }, [pokemon, searchPoke]);

    useEffect(() => {
        if (searchPoke !== '' && focusSearch === true) {
            Test().then(results => {
                const filteredResults = results.filter(p => p?.name?.includes(searchPoke));
                setData({
                    count: 0,
                    next: null,
                    previous: null,
                    results: filteredPokemon
                });
                fetchAllPokemon({ results: filteredResults })
                console.log(filteredResults)

            }).catch(error => {
                console.error('Error filtering:', error);
            });
        }
    }, [focusSearch])
    useEffect(() => {
        getPokemon(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`)
    }, []);
    // console.log(data)

    return (
        <>
            {
                loading ? <div className={styles.load}><Loading /></div>
                    : <div className={styles.container}>
                        {
                            pokemon?.length > 0 ?
                                <div className={styles.wrapper}>
                                    {
                                        filteredPokemon.map((value, index) => (
                                            <ItemContent value={value} key={index} />
                                        ))
                                    }
                                </div>
                                : <p id={styles.not_found_poke}>Not Found Pokemon</p>
            }

                        {/* Start Pagination เปลี่ยนหน้า */}
                        <div className={styles.change_pages_poke}>
                            <button onClick={() => {
                                if (data?.previous) {
                                    getPokemon(data?.previous);
                                    setInputValue(inputValue - 1);
                                }
                                console.log("Prev: ", data?.previous)
                            }}
                                className={styles.prev}>
                                <IoIosArrowBack />
                            </button>

                            <div className={styles.num_pages}>
                                <input
                                    className={styles.num_items}
                                    type='number'
                                    min={1}
                                    max={data?.count ? Math.floor(data?.count / limit) + 1 : 1}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyEnter}
                                />
                                {
                                    focusSearch ?
                                        <h4
                                            className={styles.num_items}
                                            onClick={() => window.location.reload()}>
                                            Go home
                                        </h4>
                                        : <h4 className={styles.num_items}>
                                            /{data?.count ? Math.floor(data?.count / limit) + 1 : 1}
                                        </h4>
                                }
                            </div>

                            <button onClick={() => {
                                if (data?.next) {
                                    data?.next ? getPokemon(data?.next) : null
                                    setInputValue(inputValue + 1)
                                }
                                console.log("Next:", data?.next)
                            }}
                                className={styles.next}>
                                <IoIosArrowForward />
                            </button>
                        </div>
                    </div>
            }
        </>
    )
}

export default Pagination
