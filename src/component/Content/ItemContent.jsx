import React from 'react'
import styles from './ItemContent.module.css'

const ItemContent = ({ value }) => {
    return (
        <div className={styles.item}>
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
    )
}

export default ItemContent
