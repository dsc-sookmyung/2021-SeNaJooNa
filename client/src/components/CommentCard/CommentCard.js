import React, {useState} from 'react'
import axios from 'axios'
import styles from './CommentCard.module.css';

function CommentCard(props) {
    
    const [isEdit, setIsEdit] = useState(false)
    const [comment, setComment] = useState(props.comment.content)

    function deleteHandler(){
        axios.delete(`/api/comment/${props.comment._id}`).then((response)=>{
            props.deleteComment()
        })
    }
    function editHandler(){
        setIsEdit(true)
    }
    function editInputHandler(e){
        setComment(e.target.value)
    }
    function saveHandler(){
        axios.put(`/api/comment/${props.comment._id}`, {content: comment}).then((response)=>{
            props.editComment()
            setIsEdit(false)
        })
    }

    const mine = props.user == props.comment.userId._id ? <span><button className={styles.btn} onClick={editHandler}>수정</button>&nbsp;<button className={styles.btn} onClick={deleteHandler}>삭제</button></span> : undefined

    return (
        <div className={styles.commentCard}>
            <span className={styles.userName}>{props.comment.userId.name}</span>
            <span className={styles.textTime}>{Date(props.comment.created_date).split("GMT")[0]}</span>
            {mine}
            <div className={styles.textContent}>{isEdit? <div><input value={comment} onChange={editInputHandler} /><button className={styles.btn} onClick={saveHandler}>저장</button></div> 
                                                        : comment }</div>
            <hr className={styles.hr} />
        </div>
    )
}

export default CommentCard
