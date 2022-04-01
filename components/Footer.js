import React from 'react'
import Link from 'next/link'
import styles from "../styles/Footer.module.css"
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Blood Quests 2022</p>  
      <p>
          <Link href="/about">About</Link>
      </p>
    </footer>
  )
}
