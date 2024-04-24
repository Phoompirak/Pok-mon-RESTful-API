import React, { useState, useEffect, memo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import styles from './DetailPoke.module.css'
import axios from 'axios'


const DetailPoke = memo(() => {
    const params = useParams();
    const navigate = useNavigate();
    console.log("DetailPoke rendered")

    const [data, setData] = useState({});
    const [seedPoke, setSeedPoke] = useState([]);

    const typeColors = {
        normal: "#A8A878",
        poison: "#A040A0",
        psychic: "#F85888",
        grass: "#78C850",
        ground: "#E0C068",
        ice: "#98D8D8",
        fire: "#F08030",
        rock: "#B8A038",
        dragon: "#7038F8",
        water: "#6890F0",
        bug: "#A8B820",
        dark: "#705848",
        fighting: "#C03028",
        ghost: "#705898",
        steel: "#B8B8D0",
        electric: "#F8D030",
        flying: "#A890F0",
        fairy: "#EE99AC",
    };
    const fetchPoke = (url) => {
        try {
            axios.get(url)
                .then(res => {
                    setData(res.data)
                })
            axios.get(url)
                .then(res => {
                    console.log("species url:", res.data.species.url)
                    axios.get(res.data.species.url)
                        .then(seed => setSeedPoke(seed.data))
                })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchPoke(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
        // setData(fetchingData)
    }, [])

    const filterSpecies = (seeds) => {
        if (seeds?.flavor_text_entries) {
            return Array.from(
                seeds.flavor_text_entries
                    .filter(t => t.language?.name === 'en')
                    .map(i => i.flavor_text.replace(/\r?\n|\r|\u000c/gm, ""))
                    .reduce((acc, cur) => {
                        return acc.set(cur.toLowerCase().substring(0, 10), cur);
                    }, new Map())
                    .values()
            );
        } else {
            return []; // หรือทำการ return ค่าว่างหรือค่าที่เหมาะสมเมื่อข้อมูลไม่มี
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div
                    className={styles.bg_black}
                    style={{ backgroundColor: typeColors[data?.types?.[0]?.type?.name] }}>
                    <img className={styles.bg_poke} src={data?.sprites?.other?.showdown?.back_default} />
                    <div className={styles.wrapper_detail}>
                        <div className={styles.btn_back}>
                            <button onClick={(e) => {
                                e.preventDefault()
                                navigate('/')
                            }}>Back</button>
                        </div>
                        <div className={styles.item}>
                            <img src={data?.sprites?.other?.home?.front_default} />
                        </div>
                        <div className={styles.item}>
                            <h1>{data?.name}</h1>
                        </div>
                        <div className={styles.item}>
                            <h3>Type:</h3>
                            <p>{data?.types?.map((skill, index) => (
                                <li key={index}>{skill.type.name}</li>
                            ))}</p>
                        </div>
                        <div className={styles.item}>
                            <h3>{seedPoke?.genera?.find(g => g?.language?.name === 'en').genus}</h3>
                            <ul>
                                {
                                    filterSpecies(seedPoke)
                                        .map((text, idx) => (
                                            <li key={idx}>
                                                {text}
                                            </li>
                                        ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default DetailPoke
