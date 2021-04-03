import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../../actions/user_action';
import styles from './CollectionCard.module.css';

function CollectionCard(props) {

    const [isAuth, setIsAuth] = useState(false)
    const [isLiked, setIsLiked] = useState(props.isLiked ? true : false)
    const [likeCount, setLikeCount] = useState(props.collection.like);
    const [user, setUser] = useState('');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(auth()).then(response => {
            if (response.payload.isAuth) {
                setIsAuth(true)
                setUser(response.payload._id);
                axios.get(`/api/like/collection/${props.collection._id}`).then((response) => {
                    if (response.data.like)
                        setIsLiked(true)
                    else
                        setIsLiked(false)
                })
            }
        })
    }, [])

    const collectionLikeHandler = () => {
        const doc = {
            "collectionId": props.collection._id
        }
        if (isAuth) {
            if (isLiked) {
                console.log("취소")
                axios.delete('/api/like/collection', { data: doc }).then((response) => {
                    console.log(response);
                    setIsLiked(false);
                    setLikeCount(likeCount - 1);
                    console.log(isLiked);
                })
            }
            else {
                console.log("좋아요")
                axios.post('/api/like/collection', doc).then((response) => {
                    console.log(response);
                    setIsLiked(true);
                    setLikeCount(likeCount + 1);
                    console.log(isLiked);
                })
            }
        } else {
            window.location.href = "/login"
        }
    }

    return (
        <div className={styles.collectionCard}>
            <Link to={{
                pathname: '/collection',
                state: {
                    collection: props.collection
                }
            }}>
                <div className={styles.linkContainer}>
                    <div className={styles.imgContainer}>
                        <img className={styles.img} src={props.collection.thumbnail} />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.title}>{props.collection.title}</div>
                        <div className={styles.detail}>{props.collection.content}</div>
                    </div>
                </div>
            </Link>
            <button onClick={collectionLikeHandler} disabled={props.collection.creator === user} className={styles.like}>{isLiked ? "❤️" : "🤍"}좋아요 {likeCount}</button>
        </div>
    )
}

export default withRouter(CollectionCard)
