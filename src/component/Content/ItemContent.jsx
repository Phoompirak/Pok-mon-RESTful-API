import React, { useState, memo, useEffect } from 'react'
import styles from './ItemContent.module.css'
import DetailPoke from '../DetailPoke/DetailPoke'

const ItemContent = memo(({ value }) => {
    const [showDetail, setShowDetail] = useState(true);

    useEffect(() => {
        console.log("ItemContent rendered")
    })
    return (
        <>
        {/* { showDetail && <DetailPoke value={value} />} */}
            <div className={styles.item}>
                <img src={value.sprites.other.home.front_default} alt="" />
                <h3>Name: {value.name}</h3>
                <ul>
                    {
                        value.types.map((skill, index) => (
                            <li key={index}>{skill.type.name}</li>
                        ))
                    }
                </ul>
                {/* <button
                    className={styles.button_29}
                    role="button"
                    onClick={setShowDetail(!showDetail)}
                >Detail</button> */}
            </div>
        </>
    )
})

export default ItemContent
