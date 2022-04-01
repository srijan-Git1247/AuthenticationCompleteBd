import React from 'react'
import Link from "next/link"
import styles from "../styles/Header.module.css"
import Search from './Search'
import {FaSignInAlt,FaSignOutAlt} from "react-icons/fa"
export default function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
        <Link href="/">
            <a>Blood Quests</a>
        </Link>
        </div>
        
    <nav>
        <ul>
            <li>
                <Link href="/account/login">
                <a className='btn-secondary btn-icon' id='main'> 
                <FaSignInAlt/>Login</a>
                </Link>
                
            </li>
            <li>
                <Link href="/events">
                <a>Active Requirements</a>
                </Link>
                
            </li>
            <li>
            <Link href="/events/add">
                <a>Put a Request</a>
                </Link>
                
            </li>

        </ul>
    </nav>
    </header>
  )
}
