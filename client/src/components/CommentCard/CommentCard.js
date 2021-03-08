import React from 'react'

import styles from './CommentCard.module.css';

function CommentCard() {
    return (
        <div className={styles.commentCard}>
            <span className={styles.textUser}>Username</span> <span className={styles.textTime}>created time</span>
            <br />
            <p className={styles.textContent}>comment content <br />xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxssssssssssssssssssssssssssssssssssssxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
            {/* <div className={styles.textContent}>
                comment content
            </div>
            <div className={styles.textUser}>
                username
            </div>
            <div className={styles.textTime}>
                created time
            </div> */}
            <hr className={styles.hr} />
        </div>
    )
}

export default CommentCard
