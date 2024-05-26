import React, { useState, useEffect, useMemo } from 'react'
import styles from './Content.module.css'

/* Import component */
import Loading from '../Loading/Loading'
import ItemContent from './ItemContent'

/* Library สำหรับดึงข้อมูลจากAPI Pokemon */
import axios from 'axios'

/* Import Icons */
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Content = ({ searchPoke, focusSearch }) => {
    /* ข้อมูลรวมชื่อโปเกม่อน */
    const [data, setData] = useState({});
    /* ข้อมูลแบบระเอียดของโปเกม่อนแต่ละตัว */
    const [pokemon, setPokemon] = useState([]);

    const [loading, setLoading] = useState(false);

    /* เก็บค่าหน้าContentโปเกม่อนปัจจุบัน */
    const [inputValue, setInputValue] = useState(1); // input Pages
    /* ข้อมูลโปเกม่อนต่อ1หน้า */
    const limit = 25;

    /*
    รับข้อมูลชื่อโปเกม่อนจากAPI แล้วนำไปดึงข้อมูลแบบละเอียดของโปเกม่อนต่อ
    ซึ่งจำนวณโปเกม่อนที่ดึงมาขึ้นอยู่กับตัวแปร limit
    */
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
                /* ไปดึงข้อมูลแบบละเอียดของโปเกม่อนต่อ */
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
                pokeData?.results?.map(async (result) => {
                    /* นำurl API ที่แถมมากับชื่อโปเกม่อนมาดึงข้อมูลแบบละเอียดต่อ */
                    const response = await axios.get(result.url);
                    const data = response.data;
                    return data;
                })
            );
            /* นำค่าโปเกม่อนแบบละเอียดมาเก็บใน State */
            setPokemon(pokemonData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
            setLoading(false);
            return [];
        }
    };

    /* รับค่าหน้าที่จะเปิดมาจากuser ถ้ากดEnterก็ให้ทำการไปยังหน้านั้น */
    const handleKeyEnter = (e) => {
        if (e.key === 'Enter') {
            const valueInput = parseInt(e.target.value); /* แปลงค่าที่userกรอกเป็นตัวเลขเพื่อความแน่ใจ */
            let newPage = valueInput; /* เก็บค่าหน้าปัจจุบันไว้ */
            if (valueInput < 1) { /* กันไม่ให้กรอกหน้าที่ติดลบ */
                newPage = 1;
            }
            /* ถ้าหน้าuserกรอก มากกว่า หน้าสุดท้าย ให้ใช้ค่าที่usrกรอกได้ */
            else if (valueInput > Math.floor(data?.count / limit) + 1) {
                newPage = Math.floor(data?.count / limit + 1);
            }
            /* ดึงข้อมูลตามหน้าที่userกรอก */
            getPokemon(`https://pokeapi.co/api/v2/pokemon?offset=${(newPage - 1) * limit}&limit=${limit}`);
            /* เก็บค่าหน้าล่าสุดหรือหน้าที่userกรอกไว้ */
            setInputValue(parseInt(newPage));
            console.log(`Input pages: https://pokeapi.co/api/v2/pokemon?offset=${(newPage - 1) * limit}&limit=${limit}`);
        }
    }

    /* ค้นหาโปเกม่อนทุกตัวที่ userพิมพ์แล้วกดenterมา */
    const fetchForFilterSearch = async (url) => {
        /* Fetch API แบบไม่ใช้ library เนื่องจากว่าลืมใช้ axios */
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data; // ส่งเฉพาะ results กลับไป
        } catch (error) {
            console.error('Error fetching:', error);
            return []; // ถ้ามีข้อผิดพลาดในการดึงข้อมูลให้ส่งอาเรย์ว่างออกมา
        }
    };

    /* แสดงแค่โปเกม่อนที่user search ซึ่งมีแค่โปเกม่อนภายในหน้านี้เท่านั้น */
    const filteredPokemon = useMemo(() => {
        return Array.isArray(pokemon) ? pokemon?.filter((item) => /* ถ้า pokemon เป็น Arrayให้filterได้ตามปกติ */
            searchPoke.toLowerCase() === '' /* เช็คว่าseachค่าว่างไหม */
                ? item /* search ค่าว่างให้แสดงทุกตัว */
                : item.name.toLowerCase().replace(/\s/g, "").includes(searchPoke) /* แสดงแค่ตัวที่ชื่ออักษรตามที่user search */
        )
            : [];
    }, [pokemon, searchPoke]);

    /* ทำงานเมื่อกดenter search */
    useEffect(() => {
        if (searchPoke !== '' && focusSearch === true) {
            fetchForFilterSearch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').then(results => {
                const filteredResults = results?.results?.filter(p => p?.name?.includes(searchPoke));
                /* เซ็ตค่าตาม pattern ข้อมูลที่ดึงมาจากPokemon */
                setData({
                    count: 0,
                    next: null,
                    previous: null,
                    results: filteredPokemon
                });
                /* ดึงข้อมูลโปเกม่อนทุกตัวที่ userพิมพ์แล้วกดenterมา */
                fetchAllPokemon({ results: filteredResults })
                console.log("Focus search filter all pokemon:", filteredResults)

            }).catch(error => {
                console.error('Error filtering:', error);
            });
        }
    }, [focusSearch])

    useEffect(() => {
        getPokemon(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`)
    }, []);

    /* ฟังก์ชั่นสำหรับทำอนิเมชั่น pop-up แบบสมูทตอนเลื่อนเมาส์ */
    const checkScrollItems = () => {
        const triggerBottom = window.innerHeight / 5 * 4; /* แบ่งหน้าจอแนวนอนเป็น5ส่วน */
        const cardItems = document.querySelectorAll('.items');
        if (cardItems && triggerBottom) {
            cardItems.forEach(card => {
                const itemTop = card.getBoundingClientRect().top; /* ค่าระยะห่างจากบนสุดของหน้าจอถึงบน element */
                if (itemTop < triggerBottom) {
                    card.style.transform = 'translateY(0) scale(1)'
                    card.style.opacity = '1';
                } else {
                    card.style.transform = 'translateY(100px) scale(.5)'
                    card.style.opacity = '0';
                }
            })
        }
    }
    window.addEventListener('scroll', checkScrollItems) /* เรียกฟังก์ชั่นcheckScrollItemsเมื่อมีscroll mouse */
    return (
        <>
            {
                /* รอโหลดข้อมูลเสร็จ ค่อยโชว์ข้อมูล */
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

                        {/* Start Pagination สำหรับเปลี่ยนหน้าไปดูข้อมูลโปเกม่อนตัวอื่น */}
                        <div className={styles.change_pages_poke}>
                            {/* ปุ่มกดกลับไปหน้าที่ผ่านมา */}
                            <button onClick={() => {
                                /* เช็คว่าข้อมูลหน้าที่ผ่านมามีไหม */
                                if (data?.previous) {
                                    /* ถ้ามีให้กลับไปหน้าก่อนได้ */
                                    getPokemon(data?.previous);
                                    /* ลดค่าหน้าปัจจุบัน */
                                    setInputValue(inputValue - 1);
                                }
                                console.log("Prev page: ", data?.previous)
                            }}
                                className={styles.prev}>
                                <IoIosArrowBack /> {/* ไอคอน ลูกศรกลับหลัง */}
                            </button>
                            {/* ตัวเลขหน้าปัจจุบันและหน้าสุดท้าย จะได้รู้ว่ามีกี่หน้าแล้วอยู่หน้าเท่าไหร่ */}
                            <div className={styles.num_pages}>
                                <input
                                    className={styles.num_items}
                                    type='number'
                                    min={1}
                                    /* จำนวนโปเกม่อนทั้งหมด / จำนวนโปเกม่อนต่อหน้า + 1 จะได้ไม่มีหน้าที่0 */
                                    max={data?.count ? Math.floor(data?.count / limit) + 1: 1}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyEnter}
                                />
                                {
                                    /* ถ้ากดenter search แล้วจะรวมทุกโปเกม่อนที่มีชื่อคล้ายกับที่ค้นหา เลยไม่มีหน้าอื่นเพราะใส่มาทั้งหมดในหน้าเดียว */
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
                            
                            {/* ปุ่มไปยังหน้าถัดไป */}
                            <button onClick={() => {
                                /* เช็คว่าข้อมูลหน้าต่อไปมีไหม */
                                if (data?.next) {
                                    /* ถ้าหน้าต่อไปมีก้เพิ่มค่าหน้าปัจจุบันและเปลี่ยนข้อมูลโปเกม่อนเป็นของอีกหน้า */
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

export default Content
