import React from 'react'
import styles from './Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.flex}>
      {/* โหลดดิ้งซึ่งทำใน Css animation */}
      <div className={styles.circle}></div>
    </div>
  )
}

export default Loading
