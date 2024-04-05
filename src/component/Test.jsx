import React, { useState, useEffect } from 'react'
import styles from './Test.module.css'

const Test = () => {
  const [pokemon, setPokemon] = useState([]);

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

  const fetchPoke = async (BASE_URL) => {
    const res = await fetch(BASE_URL)
      .then(res => res.json())
      .then(data => data.results)
      .catch(err => console.log(`Error fetching pokemon: ${err}`))
    let pokemonData = [];
    for (const result of res) {
      const pokeRes = await fetch(result.url)
        .then(res => res.json());
      pokemonData.push(pokeRes);
    }
    pokemonData = await Promise.all(pokemonData)
    setPokemon(pokemonData);
  }

  useEffect(() => {
    fetchPoke("https://pokeapi.co/api/v2/pokemon?limit=30&offset=1302");
  }, [])

  console.log(pokemon);

  return (
    <div>
      <ul className={styles.container}>
        {
          pokemon?.map((val, index) => (
            <li className={styles.item} key={index}>
              <img src={val.sprites.other.showdown.front_default} />
              <h3>
                {val.name}
              </h3>
              <p>{val.types[0].type.name}</p>
              <div className={styles.bg_color}
                style={{
                  backgroundColor: typeColors[val.types[0].type.name],
                }}>
                <img src={val.sprites.back_default}/>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Test
