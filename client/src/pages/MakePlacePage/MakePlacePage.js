import React from 'react'
import styles from './MakePlacePage.module.css'

function MakePlacePage() {
    return (
        <div className={styles.container}>
            <div className={styles.makePlacePage}>
                <div className={styles.formBox}>
                    <h2>새 플레이스 만들기</h2>
                    <hr className={styles.hr} />
                    <form className={styles.form}>
                        <label for='name'>Place Name</label>
                        <input type='text' placeholder='Enter Name' className={styles.input}></input>

                        <label for='description'>Place Description</label>
                        <input type='text' placeholder='Enter Description' className={styles.input}></input>

                        <label for='address'>Place Address</label>
                        <input type='text' placeholder='Enter Address' className={styles.input}></input>

                        <button className={styles.takeThumbnailBtn}>썸네일 가져오기</button>

                        <hr className={styles.hr} />

                        <button className={`${styles.button} ${styles.cancelBtn}`}>Cancel</button>

                        <button className={`${styles.button} ${styles.makeBtn}`}>Make</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MakePlacePage
