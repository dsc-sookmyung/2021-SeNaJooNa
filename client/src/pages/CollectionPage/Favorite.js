import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { auth } from '../../actions/user_action';
import styles from './ThirdPage.module.css';

function Favorite(props) {

    const collectionId = props.collectionId;

    const [isAuth, setIsAuth] = useState(false)
    const [isLiked, setIsLiked] = useState("")

    const dispatch = useDispatch();
    useEffect(() => {
        console.log(collectionId);
        dispatch(auth()).then(response => {
            if (response.payload.isAuth && props.collection.creator !== response.payload._id) {
                setIsAuth(true)

                axios.get(`/api/likeCollections/${props.collection._id}`).then((response) => {
                    if (response.data.like)
                        setIsLiked(true)
                    else
                        setIsLiked(false)
                })
            }
        })
    }, [props.collection._id])

    const collectionLikeHandler = () => {
        const doc = {
            "collectionId": collectionId
        }
        console.log(doc);
        if (isLiked) {
            console.log("취소")
            axios.delete('/api/likeCollections', { data: doc }).then((response) => {
                console.log(response);
                setIsLiked(false);
                console.log(isLiked);
            })
        }
        else {
            console.log("좋아요")
            axios.post('/api/likeCollections', doc).then((response) => {
                console.log(response);
                setIsLiked(true);
                console.log(isLiked);
            })
        }
    }

    return (
        <div>
            <button onClick={collectionLikeHandler} className={styles.like}>{isLiked ? "❤" : "♡"} Collection Like </button>
        </div>
    )
}

export default Favorite