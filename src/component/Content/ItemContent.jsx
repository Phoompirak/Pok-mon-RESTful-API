import React, { useState, memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './ItemContent.module.css'
import { GoHeartFill, GoHeart } from "react-icons/go";

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

const ItemContent = memo(({ value }) => {
    const [hoverItem, setHoverItem] = useState(false)
    const storageLikePoke =  new Map(JSON.parse(sessionStorage.getItem('favPoke'))) || false
    const likePoke = storageLikePoke.get(value.name) ? true : false

    const addLikePoke = (name, id) => {
        const storageFavPokeJSON = sessionStorage.getItem('favPoke');
        const storageFavPoke = storageFavPokeJSON ? new Map(JSON.parse(storageFavPokeJSON)) : new Map();
        if (storageFavPoke.get(name)) {return}
        else {
            storageFavPoke.set(name, id)
            const storageFavPokeUpdate = JSON.stringify(Array.from(storageFavPoke))
            sessionStorage.setItem('favPoke', storageFavPokeUpdate)
            console.log(storageFavPoke);
        }
    }
    const removeLikePoke = (name) => {
        const storageFavPokeJSON = sessionStorage.getItem('favPoke');
        const storageFavPoke = storageFavPokeJSON ? new Map(JSON.parse(storageFavPokeJSON)) : new Map();

        if (storageFavPoke.get(name)) {
            storageFavPoke.delete(name)
            const storageFavPokeUpdate = JSON.stringify(Array.from(storageFavPoke))
            sessionStorage.setItem('favPoke', storageFavPokeUpdate)
            console.log(new Map(JSON.parse(sessionStorage.getItem('favPoke'))))
        }
        else {
            console.log("ไม่มีPokemonที่จะลบ")
        }
    }
    return (
        <>
            <div
                className={`${styles.item} items`}
                style={{
                    outline: hoverItem && `2px solid ${typeColors[value.types[0].type.name]}`,
                    boxShadow: hoverItem
                        && `1px 1px 10px ${typeColors[value.types[0].type.name]},
                0 0 30px ${typeColors[value.types[0].type.name]}`,
                    borderBottom: hoverItem && `1.5rem solid${typeColors[value.types[0].type.name]}`
                }}
                onMouseOver={() => setHoverItem(true)}
                onMouseOut={() => setHoverItem(false)}
            >
                { likePoke 
                ? <GoHeartFill onClick={() => removeLikePoke(value.name)}/>
                : <GoHeart onClick={() => addLikePoke(value.name, value.id)}/> }
                <img src={value.sprites.other.home.front_default} className='image_items'/>
                <h3>Name: {value.name}</h3>
                <ul>
                    {
                        value.types.map((skill, index) => (
                            <li key={index}>{skill.type.name}</li>
                        ))
                    }
                </ul>
                <Link to={'/pokemon/' + value.id}>
                    <button
                        className={styles.button_29}
                        role="button"
                    >Detail</button>
                </Link>
            </div>
        </>
    )
})

export default ItemContent
