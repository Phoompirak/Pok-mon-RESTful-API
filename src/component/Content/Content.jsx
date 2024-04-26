import { useState, useEffect, useCallback, useMemo, memo } from 'react'
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

const Content = memo(({ searchPoke }) => {
    // cache
    const [pokemon, setPokemon] = useState([]); //cache ของ ข้อมูลpokemon
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const limit = 15;

    const fetchData = async () => {
        try {
            const newPokemon = await fetchPokemon(limit, offset);
            console.log(pokemon.length)
            setPokemon([...pokemon, ...newPokemon]);
        } catch (err) {
            console.log(`Error fetching pokemon: ${err}`);
        }
        setLoading(false)
    }

    useEffect(() => {
        console.log("Effect Fetch data")
        fetchData();
    }, [offset]);

    const handleScroll = useCallback(async () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 30) {
            setLoading(true);
            setOffset((prevOffset) => prevOffset + limit);
        }
        // Return a cleanup function
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // console.log("Add event scroll")
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    const filteredPokemon = useMemo(() => {
        // console.log("useMemo filterPokemon")
        return pokemon.filter((item) =>
            searchPoke.toLowerCase() === ''
                ? item
                : item.name.toLowerCase().replace(/\s/g, "").includes(searchPoke)
        );
    }, [pokemon, searchPoke])

    const itemCards = document.querySelectorAll('.items');

    if (itemCards.length > 0) { // ตรวจสอบว่ามี elements ที่ตรงตามเงื่อนไขหรือไม่
        itemCards.forEach(card => {
            card.addEventListener('mouseover', (e) => {
                const imageItems = e.target.querySelectorAll('.image_items')
                imageItems.forEach(item => {
                    item.style.filter = 'none';
                })
            });
            card.addEventListener('mouseout', (e) => {
                const imageItems = e.target.querySelectorAll('.image_items')
                imageItems.forEach(item => {
                    item.style.filter = 'grayscale(0.44)';
                })

            });
        })
    }

    // const Test = async () => {
    //     try {
    //         const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000')
    //         .then(res => res.json())
    //         .catch(err => console.log('Error fetching:', err))
    //         return response.results;
    //     } catch (error) {
    //         console.error('Error fetching:', error);
    //         return []; // ถ้ามีข้อผิดพลาดในการดึงข้อมูลให้ส่งอาเรย์ว่างออกมา
    //     }
    // };
    // Test().then(results => {
    //     // console.log(results)
    //     const findPoke = results?.filter(p => p?.name?.includes('pika'))
    //     console.log(findPoke)
    // })
    // .catch(err => console.log("Error fetching:", err))
    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    {
                        filteredPokemon.map((value, index) => (
                            <ItemContent value={value} key={index} />
                        ))
                    }
                </div>
                {
                    loading && <Loading />
                }
            </div>
        </>
    )
})

export default Content