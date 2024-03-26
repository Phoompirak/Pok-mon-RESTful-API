import React from 'react'
import styles from './Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.flex}>
      <div className={styles.circle}></div>
      <div className={styles.three_border_spinner}></div>
    </div>
  )
}

export default Loading
