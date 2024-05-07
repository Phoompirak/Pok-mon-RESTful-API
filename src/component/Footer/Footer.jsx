import React from 'react'
import styles from './Footer.module.css'

import { Link } from 'react-router-dom';

import {
    FaYoutube,
    FaGithub,
    FaDiscord
} from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer>
                <div className={styles.wrapper_footer}>
                    <ul>
                        <li>
                            <a href='https://www.youtube.com/@phoom300x' target='_blank'>
                                <FaYoutube />
                            </a>
                        </li>
                        <li>
                            <a href='https://www.github.com/Phoompirak' target='_blank'>
                                <FaGithub />
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                <FaDiscord />
                            </a>
                        </li>
                    </ul>

                    <p>
                        Copyrigth @2024; Designed by
                        <span className={styles.design_by}> Phoom 300x</span>
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Footer
