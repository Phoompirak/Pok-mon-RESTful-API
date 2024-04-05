import { memo } from 'react'
import styles from './DetailPoke.module.css'

const DetailPoke = memo(({ value }) => {
    console.log("DetailPoke rendered")
    return (
        <>
            <div className={styles.container}>
                <div className={styles.bg_black}>
                    <div className={styles.wrapper_detail}>
                        <img src={value.sprites?.other?.home?.front_default}/>
                    </div>
                </div>
            </div>
        </>
    )
})

export default DetailPoke
