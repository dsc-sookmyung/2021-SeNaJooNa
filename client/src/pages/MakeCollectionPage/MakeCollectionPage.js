import React from 'react'
import styles from './MakeCollectionPage.module.css'

function MakeCollectionPage() {
    return (
        <div className={styles.container}>
            <div className={styles.makeCollectionPage}>
                <div className={styles.formBox}>
                    <h2>새 컬렉션 만들기</h2>
                    <hr className={styles.hr} />

                    <form className={styles.form}>
                        <label for='title'>Collection Title</label>
                        <input type='text' placeholder='Enter Title' className={styles.input}></input>

                        <label for='content'>Collection Content</label>
                        <input type='text' placeholder='Enter Content' className={styles.input}></input>

                        <div className={styles.radioDiv}>
                            <text>공개 여부: &nbsp;&nbsp;&nbsp;</text>

                            <input type='radio' name='publicPrivate' id='public' value='public' className={styles.radioInput} />
                            <label for='public' className={styles.radioLabel}>공개</label>

                            <input type='radio' name='publicPrivate' id='private' value='private' className={styles.radioInput} />
                            <label for='private' className={styles.radioLabel}>비공개</label>
                        </div>

                        <div className={styles.selectDiv}>
                            <label for='select'>카테고리 종류: &nbsp;&nbsp;&nbsp;</label>
                            <select id='select' className={styles.select}>
                                <option>카테고리</option>
                                <option>여행</option>
                                <option>맛집</option>
                                <option>관광</option>
                                <option>휴식</option>
                            </select>
                        </div>

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

export default MakeCollectionPage
