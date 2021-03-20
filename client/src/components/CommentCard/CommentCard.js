import React from 'react'

import styles from './CommentCard.module.css';

function CommentCard(props) {
    var mine = props.user==props.comment.userId._id?<span><button>수정</button><button>삭제</button></span>:undefined

    return (
        <div className={styles.commentCard}>
            <span>{props.comment.userId.name}</span> <span className={styles.textTime}>{Date(props.comment.created_date).split("GMT")[0]}</span>
            {mine}
            <div className={styles.textContent}>{props.comment.content}</div>
            <hr className={styles.hr} />
        </div>
    )
}

export default CommentCard
