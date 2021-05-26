import React from 'react'
import styles from './Spinner.module.css'

const Spinner = ({ size = 20 }) => (
  <div style={{ width: `${size}px`, height: `${size}px` }} className={styles.loader}></div>
)

export default Spinner
