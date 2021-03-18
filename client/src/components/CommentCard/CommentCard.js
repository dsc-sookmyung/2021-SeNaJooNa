import React from 'react'

import styles from './CommentCard.module.css';

function CommentCard() {
    return (
        <div className={styles.commentCard}>
            <span className={styles.textUser}>Username</span> <span className={styles.textTime}>created time</span>
            <div className={styles.textContent}>comment content xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxssssssssssssssssssssssssssssssssssssxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
            <hr className={styles.hr} />
        </div>
    )
}

export default CommentCard
