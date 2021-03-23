import React, { useState } from 'react'
import axios from 'axios'
import styles from './CommentCard.module.css';

function CommentCard(props) {

    const [isEdit, setIsEdit] = useState(false)
    const [comment, setComment] = useState(props.comment.content)

    function deleteHandler() {
        axios.delete(`/api/comment/${props.comment._id}`).then((response) => {
            props.deleteComment()
        })
    }
    function editHandler() {
        setIsEdit(true)
    }
    function editInputHandler(e) {
        setComment(e.target.value)
    }
    function saveHandler() {
        axios.put(`/api/comment/${props.comment._id}`, { content: comment }).then((response) => {
            props.editComment()
            setIsEdit(false)
        })
    }

    const mine = props.user == props.comment.userId._id ?
        <span className={styles.btnSpan}>
            <button className={styles.btn} onClick={editHandler}>수정</button>
            &nbsp;
            <button className={styles.btn} onClick={deleteHandler}>삭제</button>
        </span> : undefined

    let created_date = new Date(props.comment.created_date);

    return (
        <div className={styles.commentCard}>
            <span className={styles.userName}>{props.comment.userId.name}</span>
            <span className={styles.textTime}>
                {created_date.toLocaleTimeString(['en-US'], { year: 'numeric', month: 'numeric', day: 'numeric', hour12: false, hour: '2-digit', minute: '2-digit' })}
            </span>
            {mine}
            <br />
            <div className={styles.textContent}>{isEdit ?
                <div>
                    <input value={comment} onChange={editInputHandler} className={styles.editInput} />
                    <button className={styles.btn} onClick={saveHandler}>저장</button>
                </div> : comment}
            </div>
            <hr className={styles.hr} />
        </div>
    )
}

export default CommentCard
