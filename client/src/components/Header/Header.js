import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.css';

function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                OurPlace
            </div>
            <div className={styles.search}>
                <select className={styles.select}>
                    <option value='collection'>컬렉션</option>
                    <option value='place'>장소</option>
                </select>
                <input type='text' placeholder='Search..' className={styles.input}>
                </input>
                <button type='submit' className={styles.button}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <div className={styles.login}>
                LOG IN
            </div>
        </div>
    )
}

export default Header
