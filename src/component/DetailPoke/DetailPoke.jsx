import React, { useState, useEffect, memo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import styles from './DetailPoke.module.css'
import axios from 'axios'

import { typeColors, typeIcon } from '../../function/TypePoke'

const DetailPoke = memo(() => {
    const params = useParams();
    const navigate = useNavigate();
    console.log("DetailPoke rendered")

    const [data, setData] = useState({});
    const [seedPoke, setSeedPoke] = useState([]);

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
                    <img
                        className={styles.bg_poke}
                        src={
                            data?.sprites?.other?.showdown?.back_default
                            || data?.sprites?.other?.showdown?.front_default
                        } />
                    <div className={styles.wrapper_detail}>
                        <div className={styles.btn_back}>
                            <button onClick={(e) => {
                                e.preventDefault()
                                navigate('/')
                            }}>Back</button>
                        </div>
                        <div className={styles.item}>
                            <img src={
                                data?.sprites?.other["official-artwork"]?.front_default ?
                                    data?.sprites?.other["official-artwork"]?.front_default
                                    : data?.sprites?.other?.home?.front_default
                                    || data?.sprites?.front_default
                                    || 'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg'
                            } />
                        </div>
                        <div className={styles.item}>
                            <h1
                            style={{ color: typeColors[data?.types?.[0]?.type?.name] }}
                            className={styles.name_poke}>
                                {data?.name}
                                </h1>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.item_head}>
                                <h3
                                    style={{ color: typeColors[data?.types?.[0]?.type?.name] }}>
                                    {seedPoke?.genera?.find(g => g?.language?.name === 'en').genus}
                                </h3>
                                <ul className={styles.types_poke}>
                                    {data?.types?.map((skill, index) => (
                                        <li
                                            key={index}
                                            style={{ backgroundColor: typeColors[skill.type.name] }}
                                            className={styles.type}>
                                            {typeIcon[skill.type.name]} {skill.type.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles.item_detail}>
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
                        <div className={styles.item}>
                            <div className={styles.all_status}>
                                <div className={styles.profile}>
                                    <h3
                                        style={{ color: typeColors[data?.types?.[0]?.type?.name] }}>
                                        Profile
                                    </h3>
                                    <ul>
                                        <li>Height: {data?.height / 10}m</li>
                                        <li>Weight: {data?.weight / 10}kg</li>
                                        <li>Shape: {seedPoke?.shape?.name}</li>
                                        <li>Habitat: {seedPoke?.habitat?.name}</li>
                                    </ul>
                                </div>
                                <div className={styles.abilities}>
                                    <h3
                                        style={{ color: typeColors[data?.types?.[0]?.type?.name] }}>
                                        Abilities
                                    </h3>
                                    <ul>
                                        {
                                            data?.abilities?.map((abil, index) => (
                                                <li key={index}>
                                                    {abil?.ability.name}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className={styles.stats}>
                                    <h3
                                        style={{ color: typeColors[data?.types?.[0]?.type?.name] }}>
                                        Stats
                                    </h3>
                                    <ul>
                                        {data?.stats?.map(s => (
                                            <li key={s?.stat?.name}>
                                                {s?.stat?.name}: {s.base_stat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default DetailPoke
